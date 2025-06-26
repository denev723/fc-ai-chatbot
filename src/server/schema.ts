import { gql } from "graphql-tag";
import { PubSub } from "graphql-subscriptions";
import { getAiResponse } from "@/server/openai";

const pubsub = new PubSub();

export const typeDefs = gql`
  type Message {
    id: ID!
    message: String!
    sender: String!
    createdAt: String!
  }

  type Query {
    hello: String!
  }

  type Mutation {
    sendMessage(message: String!): Message!
  }

  type Subscription {
    newMessage: Message!
  }
`;

export const resolvers = {
  Query: {
    hello: () => "Hello, world!",
  },
  Mutation: {
    sendMessage: async (_: any, { message }: { message: string }) => {
      const newMessage = makeNewMessage(message, "me");

      pubsub.publish("NEW_MESSAGE", { newMessage });

      publishAfterAIResponse(message);

      return newMessage;
    },
  },
  Subscription: {
    newMessage: {
      subscribe: () => pubsub.asyncIterator(["NEW_MESSAGE"]),
    },
  },
};

const publishAfterAIResponse = async (message: string) => {
  const response = await getAiResponse(message);
  pubsub.publish("NEW_MESSAGE", {
    newMessage: makeNewMessage(response, "bot"),
  });
};

const makeNewMessage = (message: string, sender: Message["sender"]) => {
  return {
    id: Math.random().toString(36).substring(2, 9),
    message,
    sender,
    createdAt: new Date().toISOString(),
  };
};
