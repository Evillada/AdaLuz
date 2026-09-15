import Link from "next/link";

import { AtmosphereMedia } from "@/components/brand/AtmosphereMedia";
import { Reveal } from "@/components/motion/Reveal";

import type { EditorialSectionProps } from "./types";

export function LightInLifeSection({
  eyebrow,
  title,
  body,
  imageUrl,
  cta,
}: EditorialSectionProps) {
  return (
    <section className="band-warm relative px-6 py-28 sm:py-40">
      <Reveal className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
        <AtmosphereMedia
          imageUrl={imageUrl}
          tone="dark"
          className="aspect-[4/5] min-h-[22rem] w-full lg:min-h-[32rem]"
        />
        <div className="max-w-xl lg:pt-8">
          {eyebrow && (
            <p className="text-xs font-semibold tracking-[0.28em] text-ochre uppercase">
              {eyebrow}
            </p>
          )}
          <div className="gold-rule mt-6" />
          <h2 className="mt-7 font-serif text-4xl leading-[1.05] tracking-[-0.02em] text-bronze sm:text-6xl">
            {title}
          </h2>
          <p className="mt-8 text-lg leading-9 text-[color:var(--ink-soft)]">
            {body}
          </p>
          {cta && (
            <Link
              href={cta.href}
              className="mt-10 inline-flex border-b border-ochre pb-1.5 text-sm font-semibold tracking-[0.16em] uppercase transition-colors hover:text-ochre"
            >
              {cta.label}
            </Link>
          )}
        </div>
      </Reveal>
    </section>
  );
}
