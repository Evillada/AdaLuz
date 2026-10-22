"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";

import { getCandleDesign, type CandleDesignId } from "@/lib/candle-designs";

import { CandleArt } from "./CandleArt";
import { CandleFlame } from "./CandleFlame";

type SectionCandleProps = {
  design: CandleDesignId;
  /** Position and size classes relative to the parent section, which must be `relative`. */
  className: string;
};

export function SectionCandle({ design, className }: SectionCandleProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 28,
    mass: 0.4,
  });

  const presence = useTransform(progress, [0, 0.08, 0.92, 1], [0, 1, 1, 0]);
  const drift = useTransform(progress, [0, 1], [28, -28]);
  const flameScale = useTransform(progress, [0.1, 0.24, 0.68, 0.82], [0, 1, 1, 0]);
  const flameOpacity = useTransform(progress, [0.1, 0.16, 0.74, 0.82], [0, 1, 1, 0]);
  const glow = useTransform(progress, [0.1, 0.26, 0.66, 0.82], [0, 0.9, 0.9, 0]);
  const smoke = useTransform(progress, [0.78, 0.85, 0.97], [0, 1, 0]);

  return (
    <div ref={ref} aria-hidden="true" className="pointer-events-none absolute inset-0 z-10">
      <motion.div className={`absolute ${className}`} style={{ opacity: presence, y: drift }}>
        <CandleArt
          design={getCandleDesign(design)}
          className="candle-float h-auto w-full"
          flame={
            <CandleFlame
              scale={flameScale}
              opacity={flameOpacity}
              glow={glow}
              smoke={smoke}
            />
          }
        />
      </motion.div>
    </div>
  );
}
