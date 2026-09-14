import Link from "next/link";

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
    <section className="px-6 py-24 sm:py-36">
      <Reveal className="mx-auto grid max-w-6xl items-center gap-14 md:grid-cols-[0.9fr_1.1fr]">
        <div
          aria-hidden="true"
          className="aspect-[4/5] bg-ochre/15 bg-cover bg-center"
          style={imageUrl ? { backgroundImage: `url("${imageUrl}")` } : undefined}
        />
        <div className="max-w-xl">
          {eyebrow && (
            <p className="text-xs font-semibold tracking-[0.24em] text-ochre uppercase">
              {eyebrow}
            </p>
          )}
          <h2 className="mt-5 font-serif text-4xl leading-tight text-ochre sm:text-6xl">
            {title}
          </h2>
          <p className="mt-7 text-lg leading-8 text-bronze/80">{body}</p>
          {cta && (
            <Link
              href={cta.href}
              className="mt-8 inline-flex border-b border-ochre pb-1 text-sm font-semibold tracking-[0.14em] uppercase"
            >
              {cta.label}
            </Link>
          )}
        </div>
      </Reveal>
    </section>
  );
}
