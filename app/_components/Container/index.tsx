// components/container.tsx
import type { ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
  large?: boolean;
  className?: string;
};

export default function Container({
  children,
  large = false,
  className = "",
}: ContainerProps) {
  return (
    <div
      className={`mx-auto w-[92%] ${
        large ? "max-w-[1280px]" : "max-w-[1152px]"
      } ${className}`}
    >
      {children}
    </div>
  );
}
