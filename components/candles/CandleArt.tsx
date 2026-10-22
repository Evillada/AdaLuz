import { useId, type ReactNode } from "react";

import type { CandleDesign } from "@/lib/candle-designs";

type CandleArtProps = {
  design: CandleDesign;
  flame?: ReactNode;
  className?: string;
};

type Ring = { r: number; n: number; size: number };

const WICK = {
  pillar: { x: 60, top: 60, bottom: 74 },
  heart: { x: 60, top: 56, bottom: 70 },
} as const;

function mix(from: string, to: string, amount: number): string {
  const parse = (hex: string) =>
    [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));
  const a = parse(from);
  const b = parse(to);

  return `#${a
    .map((value, i) =>
      Math.round(value + (b[i] - value) * amount)
        .toString(16)
        .padStart(2, "0"),
    )
    .join("")}`;
}

export function CandleArt({ design, flame, className }: CandleArtProps) {
  const id = useId().replace(/[^a-zA-Z0-9]/g, "");
  const isHeart = design.shape === "heart";
  const wick = isHeart ? WICK.heart : WICK.pillar;

  return (
    <svg
      viewBox="0 0 120 160"
      className={className}
      overflow="visible"
      role="img"
      aria-label={`Vela ${design.name}`}
    >
      <defs>
        <linearGradient id={`${id}-wax`} x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stopColor="#e6d9c1" />
          <stop offset="28%" stopColor="#fbf6ec" />
          <stop offset="42%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#dccdb0" />
        </linearGradient>
        <linearGradient id={`${id}-wax-shade`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#fff4d6" stopOpacity="0.55" />
          <stop offset="35%" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="100%" stopColor="#8a6a45" stopOpacity="0.14" />
        </linearGradient>
        <radialGradient id={`${id}-petal`} cx="50%" cy="85%" r="85%">
          <stop offset="0%" stopColor={mix(design.petal, "#ffffff", 0.18)} />
          <stop offset="70%" stopColor={design.petal} />
          <stop offset="100%" stopColor={design.petalShade} />
        </radialGradient>
        <linearGradient id={`${id}-heart`} x1="0.1" x2="0.9" y1="0" y2="1">
          <stop offset="0%" stopColor="#fff0b8" />
          <stop offset="35%" stopColor={design.petal} />
          <stop offset="80%" stopColor={design.petalShade} />
          <stop offset="100%" stopColor={mix(design.petalShade, "#3a2414", 0.35)} />
        </linearGradient>
        <linearGradient id={`${id}-feather`} x1="0" x2="0" y1="1" y2="0">
          <stop offset="0%" stopColor="#e9d8b4" />
          <stop offset="60%" stopColor="#f8efdc" />
          <stop offset="100%" stopColor="#fffaf0" />
        </linearGradient>
      </defs>

      {isHeart ? (
        <HeartWithWings heartId={`${id}-heart`} featherId={`${id}-feather`} />
      ) : (
        <PillarWithFlower
          design={design}
          petalId={`${id}-petal`}
          waxId={`${id}-wax`}
          waxShadeId={`${id}-wax-shade`}
        />
      )}

      <line
        x1={wick.x}
        x2={wick.x}
        y1={wick.top}
        y2={wick.bottom}
        stroke="#2b1a0e"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      {flame && <g transform={`translate(${wick.x} ${wick.top})`}>{flame}</g>}
    </svg>
  );
}

function PillarWithFlower({
  design,
  petalId,
  waxId,
  waxShadeId,
}: {
  design: CandleDesign;
  petalId: string;
  waxId: string;
  waxShadeId: string;
}) {
  return (
    <g>
      <ellipse cx="60" cy="150" rx="44" ry="5.5" fill="#3a2414" opacity="0.14" />
      <path
        d="M20 80 L20 140 Q20 150 30 150 L90 150 Q100 150 100 140 L100 80 Z"
        fill={`url(#${waxId})`}
        stroke="#d4c09a"
        strokeWidth="0.7"
      />
      <path
        d="M20 80 L20 140 Q20 150 30 150 L90 150 Q100 150 100 140 L100 80 Z"
        fill={`url(#${waxShadeId})`}
      />
      <rect x="31" y="86" width="5" height="56" rx="2.5" fill="#ffffff" opacity="0.55" />
      <path
        d="M72 80 C72 88 76 90 76 96 C76 100 71 100 71 96 C71 91 68 88 68 80 Z"
        fill="#fbf6ec"
        stroke="#d4c09a"
        strokeWidth="0.5"
      />
      <path
        d="M44 80 C44 85 46.5 86 46.5 89.5 C46.5 92 43 92 43 89.5 C43 87 41 85 41 80 Z"
        fill="#fbf6ec"
        stroke="#d4c09a"
        strokeWidth="0.5"
      />
      <ellipse cx="60" cy="80" rx="40" ry="10.5" fill="#fdf9f1" stroke="#e2d3b4" strokeWidth="0.7" />
      <ellipse cx="60" cy="82" rx="34" ry="7" fill="#3a2414" opacity="0.12" />

      <g transform="translate(60 74) scale(1 0.64)">
        {design.shape === "rose" && <Rose design={design} petalId={petalId} />}
        {design.shape === "peony" && <Peony design={design} petalId={petalId} />}
        {design.shape === "dahlia" && <Dahlia design={design} petalId={petalId} />}
      </g>
    </g>
  );
}

function ringColor(design: CandleDesign, k: number, total: number) {
  return mix(design.petal, design.petalShade, (k / Math.max(1, total - 1)) * 0.75);
}

function Rose({ design, petalId }: { design: CandleDesign; petalId: string }) {
  const rings: Ring[] = [
    { r: 38, n: 9, size: 13 },
    { r: 30, n: 8, size: 12 },
    { r: 22, n: 7, size: 10.5 },
    { r: 14, n: 5, size: 9 },
  ];
  const highlight = mix(design.petal, "#ffffff", 0.55);

  return (
    <>
      {rings.map((ring, k) => {
        const w = ring.size * 0.95;
        const h = ring.size * 1.25;
        const cup = `M${-w} 0 C${-w} ${-h} ${w} ${-h} ${w} 0 C${w * 0.45} ${h * 0.28} ${-w * 0.45} ${h * 0.28} ${-w} 0 Z`;
        const lip = `M${-w} 0 C${-w} ${-h} ${w} ${-h} ${w} 0`;

        return Array.from({ length: ring.n }, (_, i) => (
          <g
            key={`${k}-${i}`}
            transform={`rotate(${(360 / ring.n) * i + k * 21}) translate(0 ${-ring.r + h * 0.75})`}
          >
            <path
              d={cup}
              fill={k === 0 ? `url(#${petalId})` : ringColor(design, k, rings.length)}
              stroke={design.petalShade}
              strokeOpacity="0.5"
              strokeWidth="0.7"
            />
            <path d={lip} fill="none" stroke={highlight} strokeOpacity="0.85" strokeWidth="0.9" />
          </g>
        ));
      })}
      <circle r="7" fill={mix(design.petalShade, "#3a2414", 0.15)} />
      <path
        d="M0 -5.5 C4.5 -5.5 5.5 0 3 3 C0.5 5.5 -4 4 -4 0.5 C-4 -2.5 -1 -3.5 1 -2 C2.5 -0.8 1.5 1.5 0 1.2"
        fill="none"
        stroke={highlight}
        strokeOpacity="0.9"
        strokeWidth="1"
        strokeLinecap="round"
      />
    </>
  );
}

function Peony({ design, petalId }: { design: CandleDesign; petalId: string }) {
  const rings: Ring[] = [
    { r: 39, n: 11, size: 12 },
    { r: 32, n: 10, size: 11 },
    { r: 25, n: 9, size: 10 },
    { r: 18, n: 7, size: 8.5 },
    { r: 11, n: 5, size: 7 },
  ];
  const highlight = mix(design.petal, "#ffffff", 0.5);

  return (
    <>
      {rings.map((ring, k) => {
        const w = ring.size;
        const h = ring.size * 1.2;
        const ruffle = `M0 0 C${-w} ${-h * 0.25} ${-w * 1.05} ${-h * 0.95} ${-w * 0.55} ${-h} Q${-w * 0.28} ${-h * 1.12} 0 ${-h * 0.98} Q${w * 0.28} ${-h * 1.12} ${w * 0.55} ${-h} C${w * 1.05} ${-h * 0.95} ${w} ${-h * 0.25} 0 0 Z`;
        const edge = `M${-w * 0.55} ${-h} Q${-w * 0.28} ${-h * 1.12} 0 ${-h * 0.98} Q${w * 0.28} ${-h * 1.12} ${w * 0.55} ${-h}`;

        return Array.from({ length: ring.n }, (_, i) => (
          <g
            key={`${k}-${i}`}
            transform={`rotate(${(360 / ring.n) * i + k * 15}) translate(0 ${-ring.r + h * 0.95})`}
          >
            <path
              d={ruffle}
              fill={k === 0 ? `url(#${petalId})` : ringColor(design, k, rings.length)}
              stroke={design.petalShade}
              strokeOpacity="0.45"
              strokeWidth="0.7"
            />
            <path d={edge} fill="none" stroke={highlight} strokeOpacity="0.4" strokeWidth="0.6" />
          </g>
        ));
      })}
      <circle r="5" fill={mix(design.petalShade, "#3a2414", 0.2)} />
    </>
  );
}

function Dahlia({ design, petalId }: { design: CandleDesign; petalId: string }) {
  const rings: Ring[] = [
    { r: 40, n: 20, size: 6.4 },
    { r: 31, n: 16, size: 5.4 },
    { r: 22, n: 12, size: 4.4 },
    { r: 14, n: 9, size: 3.4 },
  ];
  const vein = mix(design.petal, "#ffffff", 0.45);
  const center = design.center ?? design.petalShade;
  const seeds = Array.from({ length: 22 }, (_, i) => {
    const angle = i * 137.5 * (Math.PI / 180);
    const radius = 1.3 * Math.sqrt(i);

    return {
      x: Number((radius * Math.cos(angle)).toFixed(2)),
      y: Number((radius * Math.sin(angle)).toFixed(2)),
    };
  });

  return (
    <>
      {rings.map((ring, k) => {
        const w = ring.size;
        const l = ring.r;
        const petal = `M0 0 C${w} ${-l * 0.3} ${w} ${-l * 0.78} 0 ${-l} C${-w} ${-l * 0.78} ${-w} ${-l * 0.3} 0 0 Z`;

        return Array.from({ length: ring.n }, (_, i) => (
          <g key={`${k}-${i}`} transform={`rotate(${(360 / ring.n) * i + k * 9})`}>
            <path
              d={petal}
              fill={k === 0 ? `url(#${petalId})` : ringColor(design, k, rings.length)}
              stroke={design.petalShade}
              strokeOpacity="0.55"
              strokeWidth="0.6"
            />
            <path
              d={`M0 ${-l * 0.22} L0 ${-l * 0.88}`}
              stroke={vein}
              strokeOpacity="0.7"
              strokeWidth="0.6"
              strokeLinecap="round"
            />
          </g>
        ));
      })}
      <circle r="8" fill={center} stroke={mix(center, "#3a2414", 0.4)} strokeWidth="0.8" />
      {seeds.map((seed, i) => (
        <circle
          key={i}
          cx={seed.x}
          cy={seed.y}
          r="0.75"
          fill={mix(center, "#3a2414", 0.45)}
        />
      ))}
    </>
  );
}

function HeartWithWings({ heartId, featherId }: { heartId: string; featherId: string }) {
  const rows = [
    { length: 44, width: 11, from: -8, to: -92, count: 9 },
    { length: 34, width: 10, from: -14, to: -86, count: 8 },
    { length: 24, width: 8.5, from: -20, to: -80, count: 6 },
  ];
  const feathers = rows.flatMap((row, k) =>
    Array.from({ length: row.count }, (_, i) => {
      const angle = row.from + ((row.to - row.from) / (row.count - 1)) * i;
      const { length: l, width: w } = row;

      return {
        key: `${k}-${i}`,
        angle,
        shape: `M0 0 C${w} ${-l * 0.2} ${w * 1.05} ${-l * 0.8} 0 ${-l} C${-w * 1.05} ${-l * 0.8} ${-w} ${-l * 0.2} 0 0 Z`,
        vein: `M0 ${-l * 0.12} Q${w * 0.25} ${-l * 0.55} 0 ${-l * 0.9}`,
      };
    }),
  );

  const wing = (
    <g transform="translate(42 84)">
      {feathers.map((feather) => (
        <g key={feather.key} transform={`rotate(${feather.angle})`}>
          <path d={feather.shape} fill={`url(#${featherId})`} stroke="#c9ad75" strokeWidth="0.8" />
          <path d={feather.vein} fill="none" stroke="#c9ad75" strokeOpacity="0.7" strokeWidth="0.6" />
        </g>
      ))}
    </g>
  );

  return (
    <g>
      <ellipse cx="60" cy="132" rx="40" ry="5" fill="#3a2414" opacity="0.14" />
      {wing}
      <g transform="translate(120 0) scale(-1 1)">{wing}</g>
      <path
        d="M60 72 C52 56 28 58 30 80 C32 98 52 110 60 122 C68 110 88 98 90 80 C92 58 68 56 60 72 Z"
        fill={`url(#${heartId})`}
        stroke="#9a6a0c"
        strokeOpacity="0.55"
        strokeWidth="0.9"
      />
      <path
        d="M60 72 C52 56 28 58 30 80"
        fill="none"
        stroke="#fff6d2"
        strokeOpacity="0.7"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <ellipse cx="42" cy="75" rx="5" ry="8.5" fill="#ffffff" opacity="0.4" transform="rotate(-28 42 75)" />
      <circle cx="75" cy="72" r="1.8" fill="#ffffff" opacity="0.55" />
    </g>
  );
}
