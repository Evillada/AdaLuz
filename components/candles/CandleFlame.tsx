"use client";

import { motion, type MotionValue } from "framer-motion";
import { useId } from "react";

type Animatable = number | MotionValue<number>;

type CandleFlameProps = {
  scale?: Animatable;
  opacity?: Animatable;
  glow?: Animatable;
  smoke?: Animatable;
};

/** Drawn with the wick tip at the origin, so the parent translates it onto the candle. */
export function CandleFlame({
  scale = 1,
  opacity = 1,
  glow = 0.9,
  smoke = 0,
}: CandleFlameProps) {
  const id = useId().replace(/[^a-zA-Z0-9]/g, "");

  return (
    <g>
      <defs>
        <radialGradient id={`${id}-glow`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffe28a" stopOpacity="0.9" />
          <stop offset="45%" stopColor="#f1c43f" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#f1c43f" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`${id}-flame`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#fff3c4" />
          <stop offset="55%" stopColor="#ffc53d" />
          <stop offset="100%" stopColor="#e07a12" />
        </linearGradient>
      </defs>

      <motion.circle cx="0" cy="-14" r="44" fill={`url(#${id}-glow)`} style={{ opacity: glow }} />

      <motion.g
        style={{
          scale,
          opacity,
          originX: 0.5,
          originY: 1,
          transformBox: "fill-box",
        }}
      >
        <g className="candle-flicker">
          <path
            d="M0 -36 C8 -22 13 -12 9 -4 C6 2.5 -6 2.5 -9 -4 C-13 -12 -8 -22 0 -36 Z"
            fill="#ffd46b"
            opacity="0.3"
          />
          <path
            d="M0 -30 C6 -18 10 -10 7 -4 C5 1 -5 1 -7 -4 C-10 -10 -6 -18 0 -30 Z"
            fill={`url(#${id}-flame)`}
          />
          <path
            d="M0 -17 C3 -11 4.5 -7.5 3 -4 C2 -1.5 -2 -1.5 -3 -4 C-4.5 -7.5 -3 -11 0 -17 Z"
            fill="#fffbe8"
          />
          <ellipse cx="0" cy="-2.5" rx="3.2" ry="2.4" fill="#5b8cff" opacity="0.55" />
        </g>
      </motion.g>

      <motion.g className="candle-smoke" style={{ opacity: smoke }}>
        <path d="M0 -2 C-4 -10 4 -16 0 -24 C-3 -30 2 -35 0 -41" />
        <path d="M0 -2 C4 -9 -3 -15 1 -22 C4 -28 -1 -33 1 -39" />
        <path d="M0 -2 C-3 -8 3 -13 -1 -20 C-4 -26 1 -31 -1 -37" />
      </motion.g>
    </g>
  );
}
