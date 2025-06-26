import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PropsWithChildren } from "react";

let queryClient: QueryClient | null = null;

export default function Providers({ children }: PropsWithChildren) {
  return (
    <QueryClientProvider client={getQueryClient()}>
      {children}
    </QueryClientProvider>
  );
}

const getQueryClient = () => {
  if (!queryClient) {
    queryClient = new QueryClient();
  }
  return queryClient;
};
