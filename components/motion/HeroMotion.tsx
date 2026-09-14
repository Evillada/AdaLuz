import type { ReactNode } from "react";

type HeroMotionProps = {
  children: ReactNode;
  className?: string;
};

export function HeroMotion({ children, className }: HeroMotionProps) {
  return <div className={className}>{children}</div>;
}
