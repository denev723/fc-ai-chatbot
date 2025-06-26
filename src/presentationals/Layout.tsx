import { PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className="max-w-[390px] max-h-[844px] bg-white w-full h-full">
      {children}
    </div>
  );
}
