import Image from "next/image";

export function BrandWatermark({ className = "" }: { className?: string }) {
  return (
    <Image
      src="/brand/adaluz-symbol.png"
      alt=""
      aria-hidden="true"
      width={560}
      height={680}
      className={`pointer-events-none absolute h-auto select-none opacity-[0.07] dark:opacity-[0.1] ${className}`}
    />
  );
}
