/* eslint-disable @next/next/no-img-element */
import { twMerge } from "tailwind-merge";

interface Props {
  src: string;
  alt?: string;
}

export default function ProfileImage({
  src,
  alt = "profile",
  className,
}: Cn<Props>) {
  return (
    <img
      src={src}
      alt={alt}
      width={40}
      height={40}
      className={twMerge("rounded-full", className)}
    />
  );
}
