import Image from "next/image";

type LogoProps = {
  variant: "symbol" | "lockup";
  className?: string;
};

const crops = {
  symbol: { x: 475, y: 250, width: 140, height: 170 },
  lockup: { x: 445, y: 245, width: 205, height: 235 },
} as const;

export function Logo({ variant, className }: LogoProps) {
  const crop = crops[variant];

  return (
    <span
      className={`relative block overflow-hidden ${className ?? ""}`}
      style={{ aspectRatio: `${crop.width} / ${crop.height}` }}
    >
      <Image
        src="/brand/adaluz-brand-sheet.png"
        alt="Adaluz"
        width={1024}
        height={801}
        priority
        className="absolute max-w-none mix-blend-multiply"
        style={{
          width: `${(1024 / crop.width) * 100}%`,
          height: "auto",
          left: `${(-crop.x / crop.width) * 100}%`,
          top: `${(-crop.y / crop.height) * 100}%`,
        }}
      />
    </span>
  );
}
