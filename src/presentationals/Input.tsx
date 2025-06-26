import { InputHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

interface Props {}

export default function Input({
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={twMerge(
        "pl-20 pr-39 py-15 rounded-25 placeholder:text-gray400 font-medium text-16",
        className
      )}
      {...props}
    />
  );
}
