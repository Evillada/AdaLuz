import Image from "next/image";

type LogoProps = {
  variant: "symbol" | "lockup";
  className?: string;
};

const assets = {
  symbol: { src: "/brand/adaluz-symbol.png", width: 560, height: 680 },
  lockup: { src: "/brand/adaluz-lockup.png", width: 820, height: 940 },
} as const;

export function Logo({ variant, className }: LogoProps) {
  const asset = assets[variant];

  return (
    <span className={`relative block ${className ?? ""}`}>
      <Image
        src={asset.src}
        alt="Adaluz"
        width={asset.width}
        height={asset.height}
        priority
        className="h-auto w-full drop-shadow-[0_1px_1.5px_rgba(58,36,20,0.5)]"
      />
    </span>
  );
}
