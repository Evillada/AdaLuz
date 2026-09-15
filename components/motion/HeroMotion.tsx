"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type HeroMotionProps = {
  children: ReactNode;
  className?: string;
};

export function HeroMotion({ children, className }: HeroMotionProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 36 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.05, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
