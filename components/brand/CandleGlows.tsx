import type { CSSProperties } from "react";

type Glow = {
  x: string;
  y: string;
  size: string;
  /** Two waypoints the glow wanders through before returning home. */
  path: [string, string, string, string];
  drift: number;
  flicker: number;
};

const glows: Glow[] = [
  { x: "12%", y: "16%", size: "38vmax", path: ["18vw", "10vh", "6vw", "24vh"], drift: 26, flicker: 7 },
  { x: "84%", y: "28%", size: "30vmax", path: ["-20vw", "14vh", "-8vw", "-10vh"], drift: 32, flicker: 9 },
  { x: "28%", y: "66%", size: "34vmax", path: ["14vw", "-18vh", "26vw", "-6vh"], drift: 29, flicker: 8 },
  { x: "76%", y: "84%", size: "40vmax", path: ["-16vw", "-12vh", "-28vw", "4vh"], drift: 36, flicker: 10 },
  { x: "52%", y: "44%", size: "22vmax", path: ["-22vw", "8vh", "12vw", "16vh"], drift: 22, flicker: 6 },
  { x: "94%", y: "62%", size: "18vmax", path: ["-14vw", "-20vh", "-30vw", "-8vh"], drift: 24, flicker: 5.5 },
];

/** Out-of-focus candle lights drifting behind public pages, dark theme only. */
export function CandleGlows() {
  return (
    <div
      data-candle-glows="true"
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 hidden overflow-hidden dark:block"
    >
      {glows.map((glow, index) => (
        <span
          key={`${glow.x}-${glow.y}`}
          className="candle-glow"
          style={
            {
              left: glow.x,
              top: glow.y,
              "--glow-size": glow.size,
              "--dx1": glow.path[0],
              "--dy1": glow.path[1],
              "--dx2": glow.path[2],
              "--dy2": glow.path[3],
              animationDuration: `${glow.drift}s, ${glow.flicker}s`,
              animationDelay: `-${index * 4}s, -${index * 1.3}s`,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}
