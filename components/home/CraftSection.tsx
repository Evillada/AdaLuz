import Link from "next/link";

import { AtmosphereMedia } from "@/components/brand/AtmosphereMedia";
import { Reveal } from "@/components/motion/Reveal";

import type { EditorialSectionProps } from "./types";

export function CraftSection({
  eyebrow,
  title,
  body,
  imageUrl,
  cta,
}: EditorialSectionProps) {
  return (
    <section className="band-cream relative px-6 py-28 sm:py-40">
      <Reveal className="mx-auto grid max-w-6xl gap-14 md:grid-cols-2 md:items-end md:gap-16">
        <div className="md:pb-6">
          {eyebrow && (
            <p className="text-xs font-semibold tracking-[0.28em] text-ochre uppercase">
              {eyebrow}
            </p>
          )}
          <div className="gold-rule mt-6" />
          <h2 className="mt-7 font-serif text-4xl leading-[1.05] tracking-[-0.02em] text-bronze sm:text-6xl">
            {title}
          </h2>
          <p className="mt-8 max-w-xl text-lg leading-9 text-[color:var(--ink-soft)]">
            {body}
          </p>
          {cta && (
            <Link
              href={cta.href}
              className="mt-10 inline-flex border-b border-ochre pb-1.5 text-sm font-semibold tracking-[0.16em] uppercase"
            >
              {cta.label}
            </Link>
          )}
        </div>
        <AtmosphereMedia
          imageUrl={imageUrl}
          kenBurns
          tone="warm"
          className="aspect-[5/4] min-h-[18rem] w-full"
        />
      </Reveal>
    </section>
  );
}
