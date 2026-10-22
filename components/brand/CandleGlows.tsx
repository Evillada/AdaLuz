import type { CSSProperties } from "react";

const glows = [
  { x: "12%", y: "16%", size: "38vmax", duration: "7s", delay: "0s" },
  { x: "84%", y: "28%", size: "30vmax", duration: "9s", delay: "-2s" },
  { x: "28%", y: "66%", size: "34vmax", duration: "8s", delay: "-4s" },
  { x: "76%", y: "84%", size: "40vmax", duration: "10s", delay: "-1s" },
  { x: "52%", y: "44%", size: "22vmax", duration: "6s", delay: "-3s" },
  { x: "94%", y: "62%", size: "18vmax", duration: "5.5s", delay: "-5s" },
];

/** Out-of-focus candle lights behind public pages, dark theme only. */
export function CandleGlows() {
  return (
    <div
      data-candle-glows="true"
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 hidden overflow-hidden dark:block"
    >
      {glows.map((glow) => (
        <span
          key={`${glow.x}-${glow.y}`}
          className="candle-glow"
          style={
            {
              left: glow.x,
              top: glow.y,
              "--glow-size": glow.size,
              animationDuration: glow.duration,
              animationDelay: glow.delay,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}
