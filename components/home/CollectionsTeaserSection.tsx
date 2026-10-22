import Link from "next/link";

import { AtmosphereMedia } from "@/components/brand/AtmosphereMedia";
import { Reveal } from "@/components/motion/Reveal";

import type { EditorialSectionProps, SectionCta } from "./types";

export type CollectionTeaser = {
  title: string;
  body: string;
  imageUrl?: string;
  href: string;
};

type CollectionsTeaserSectionProps = EditorialSectionProps & {
  items: CollectionTeaser[];
  cta: SectionCta;
};

export function CollectionsTeaserSection({
  decoration,
  eyebrow,
  title,
  body,
  items,
  cta,
}: CollectionsTeaserSectionProps) {
  return (
    <section className="band-gold section-blend relative overflow-hidden px-6 py-28 sm:py-40">
      {decoration}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 top-10 h-72 w-72 rounded-full bg-glow/40 blur-3xl"
      />
      <Reveal className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          {eyebrow && (
            <p className="text-xs font-semibold tracking-[0.28em] text-ochre uppercase">
              {eyebrow}
            </p>
          )}
          <div className="gold-rule mt-6 opacity-90" />
          <h2 className="mt-7 font-serif text-4xl leading-[1.05] tracking-[-0.02em] text-bronze sm:text-6xl">
            {title}
          </h2>
          <p className="mt-7 text-lg leading-9 text-[color:var(--ink-soft)]">
            {body}
          </p>
        </div>

        <div className="mt-20 grid gap-14 md:grid-cols-3 md:gap-10">
          {items.map((item, index) => (
            <article
              key={item.title}
              className={`group ${index === 1 ? "md:translate-y-8" : ""}`}
            >
              <AtmosphereMedia
                imageUrl={item.imageUrl}
                tone="warm"
                shape="soft"
                className="aspect-[4/5] w-full transition-transform duration-700 group-hover:scale-[1.02]"
              />
              <p className="mt-7 text-xs tracking-[0.22em] text-ochre">
                0{index + 1}
              </p>
              <h3 className="mt-3 font-serif text-3xl leading-tight text-bronze">
                {item.title}
              </h3>
              <p className="mt-3 leading-7 text-[color:var(--ink-soft)]">
                {item.body}
              </p>
              <Link
                href={item.href}
                className="mt-6 inline-flex border-b border-ochre/50 pb-1 text-sm text-bronze transition-colors hover:border-ochre hover:text-ochre"
              >
                Descubrir
              </Link>
            </article>
          ))}
        </div>

        <Link
          href={cta.href}
          className="mt-16 inline-flex border-b border-ochre pb-1.5 text-sm font-semibold tracking-[0.16em] text-ochre uppercase"
        >
          {cta.label}
        </Link>
      </Reveal>
    </section>
  );
}
