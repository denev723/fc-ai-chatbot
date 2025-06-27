import { forwardRef, InputHTMLAttributes, Ref } from "react";
import { twMerge } from "tailwind-merge";

const Input = forwardRef(function Input(
  { className, ...props }: InputHTMLAttributes<HTMLInputElement>,
  ref: Ref<HTMLInputElement>
) {
  return (
    <input
      className={twMerge(
        "pl-20 pr-39 py-15 rounded-25 placeholder:text-gray400 font-medium text-16",
        className
      )}
      {...props}
      ref={ref}
    />
  );
});

export default Input;
