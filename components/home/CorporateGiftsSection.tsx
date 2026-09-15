import Link from "next/link";

import { Reveal } from "@/components/motion/Reveal";

import type { EditorialSectionProps } from "./types";

export function CorporateGiftsSection({
  eyebrow,
  title,
  body,
  imageUrl,
  cta,
}: EditorialSectionProps) {
  return (
    <section className="band-ochre relative isolate overflow-hidden px-6 py-28 text-bronze sm:py-40">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-cover bg-center opacity-20 mix-blend-soft-light"
        style={imageUrl ? { backgroundImage: `url("${imageUrl}")` } : undefined}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-16 bottom-0 h-64 w-64 rounded-full bg-cream/30 blur-3xl"
      />
      <Reveal className="mx-auto max-w-6xl">
        <div className="max-w-3xl">
          {eyebrow && (
            <p className="text-xs font-semibold tracking-[0.28em] uppercase">
              {eyebrow}
            </p>
          )}
          <div className="gold-rule mt-6 opacity-80" />
          <h2 className="mt-7 font-serif text-4xl leading-[1.02] tracking-[-0.02em] sm:text-7xl">
            {title}
          </h2>
          <p className="mt-8 max-w-2xl text-lg leading-9 text-bronze/80">
            {body}
          </p>
          {cta && (
            <Link
              href={cta.href}
              className="mt-10 inline-flex border-b border-bronze pb-1.5 text-sm font-semibold tracking-[0.16em] uppercase transition-opacity hover:opacity-80"
            >
              {cta.label}
            </Link>
          )}
        </div>
      </Reveal>
    </section>
  );
}
