import { gql, useSubscription } from "@apollo/client";

const NEW_MESSAGE_SUBSCRIPTION = gql`
  subscription NewMessage {
    newMessage {
      id
      sender
      message
      createdAt
    }
  }
`;

export default function useNewMessage() {
  return useSubscription(NEW_MESSAGE_SUBSCRIPTION);
}
