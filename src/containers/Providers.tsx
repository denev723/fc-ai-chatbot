import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PropsWithChildren, useEffect, useState } from "react";
import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
  split,
} from "@apollo/client";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import { getMainDefinition } from "@apollo/client/utilities";

let queryClient: QueryClient | null = null;
let apolloClient: ApolloClient<NormalizedCacheObject> | null = null;

export default function Providers({ children }: PropsWithChildren) {
  const [apolloClient, setApolloClient] =
    useState<ApolloClient<NormalizedCacheObject> | null>(null);

  useEffect(() => {
    setApolloClient(getApolloClient());
  }, []);

  return apolloClient ? (
    <ApolloProvider client={apolloClient}>
      <QueryClientProvider client={getQueryClient()}>
        {children}
      </QueryClientProvider>
    </ApolloProvider>
  ) : null;
}

const getQueryClient = () => {
  if (!queryClient) {
    queryClient = new QueryClient();
  }

  return queryClient;
};

const getApolloClient = () => {
  if (!apolloClient) {
    const httpLink = new HttpLink({
      uri: "/graphql",
    });

    const wsLink = new GraphQLWsLink(
      createClient({
        url: `ws://${location.host}/graphql`,
      })
    );

    const splitLink = split(
      ({ query }) => {
        const definition = getMainDefinition(query);
        return (
          definition.kind === "OperationDefinition" &&
          definition.operation === "subscription"
        );
      },
      wsLink,
      httpLink
    );

    apolloClient = new ApolloClient({
      link: splitLink,
      cache: new InMemoryCache(),
    });
  }

  return apolloClient;
};
