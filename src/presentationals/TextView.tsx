import { PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";

interface Props {
  size: "md" | "sm";
}

export default function TextView({
  className,
  children,
  size = "md",
}: PropsWithChildren<Cn<Props>>) {
  return <p className={twMerge(classes[size], className)}>{children}</p>;
}

const classes = {
  md: "text-14 text-gray500 font-normal",
  sm: "text-12 text-gray400 font-light",
};
