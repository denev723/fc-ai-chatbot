import { queryOptions } from "@tanstack/react-query";

const queryFactory = {
  bot: queryOptions({
    queryKey: ["bot"],
    queryFn: (): Promise<{ name: string; profileImage: string }> =>
      fetch("/api/bot").then((res) => res.json()),
  }),
};

export default queryFactory;
