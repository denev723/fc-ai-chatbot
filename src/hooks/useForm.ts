import { createRef, FormEvent, RefObject, useRef } from "react";

export default function useForm<T>() {
  const refs = useRef<Record<keyof T, RefObject<HTMLInputElement>>>(
    {} as Record<keyof T, RefObject<HTMLInputElement>>
  );

  const register = (name: keyof T) => {
    refs.current[name] = createRef<HTMLInputElement>();

    return {
      ref: refs.current[name],
      name,
    };
  };

  const handleSubmit = (onSubmit: (values: T) => void) => {
    return (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const entries: [string, RefObject<HTMLInputElement>][] = Object.entries(
        refs.current
      );
      const values = entries.reduce((acc, [name, ref]) => {
        acc[name as keyof T] = parser(ref.current!.value);
        return acc;
      }, {} as T);

      onSubmit(values);

      for (const [, ref] of entries) {
        ref.current!.value = "";
      }
    };
  };

  return {
    register,
    handleSubmit,
  };
}

const parser = (value: string) => {
  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
};
