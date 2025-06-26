import { PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";

interface Props {
  mine: boolean;
  first: boolean;
}

export default function MessageBubble({
  mine,
  first,
  children,
}: PropsWithChildren<Props>) {
  return (
    <p
      className={twMerge(
        "py-8 px-16 text-15 rounded-16",
        mine ? classes["mine"] : classes["notMine"],
        mine && first ? "rounded-ee-8" : "",
        !mine && first ? "rounded-ss-8" : ""
      )}
    >
      {children}
    </p>
  );
}

const classes = {
  mine: "bg-main text-white",
  notMine: "bg-bg text-black",
};
