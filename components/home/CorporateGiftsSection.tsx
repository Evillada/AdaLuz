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
    <section className="relative isolate overflow-hidden bg-ochre px-6 py-24 text-bronze sm:py-36">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-cover bg-center opacity-15"
        style={imageUrl ? { backgroundImage: `url("${imageUrl}")` } : undefined}
      />
      <Reveal className="mx-auto max-w-6xl">
        <div className="max-w-3xl">
          {eyebrow && (
            <p className="text-xs font-semibold tracking-[0.24em] uppercase">
              {eyebrow}
            </p>
          )}
          <h2 className="mt-5 font-serif text-4xl leading-tight sm:text-7xl">
            {title}
          </h2>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-bronze/80">
            {body}
          </p>
          {cta && (
            <Link
              href={cta.href}
              className="mt-9 inline-flex border-b border-bronze pb-1 text-sm font-semibold tracking-[0.14em] uppercase"
            >
              {cta.label}
            </Link>
          )}
        </div>
      </Reveal>
    </section>
  );
}
