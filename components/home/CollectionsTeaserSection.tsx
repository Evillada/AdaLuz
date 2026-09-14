import Link from "next/link";

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
  eyebrow,
  title,
  body,
  items,
  cta,
}: CollectionsTeaserSectionProps) {
  return (
    <section className="bg-bronze px-6 py-24 text-cream sm:py-36">
      <Reveal className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          {eyebrow && (
            <p className="text-xs font-semibold tracking-[0.24em] text-glow uppercase">
              {eyebrow}
            </p>
          )}
          <h2 className="mt-5 font-serif text-4xl leading-tight sm:text-6xl">
            {title}
          </h2>
          <p className="mt-6 text-lg leading-8 text-cream/75">{body}</p>
        </div>

        <div className="mt-16 grid gap-12 md:grid-cols-3">
          {items.map((item, index) => (
            <article key={item.title} className="border-t border-glow/35 pt-6">
              <div
                aria-hidden="true"
                className="aspect-[3/4] bg-cream/10 bg-cover bg-center"
                style={
                  item.imageUrl
                    ? { backgroundImage: `url("${item.imageUrl}")` }
                    : undefined
                }
              />
              <p className="mt-6 text-xs tracking-[0.2em] text-glow">
                0{index + 1}
              </p>
              <h3 className="mt-3 font-serif text-3xl">{item.title}</h3>
              <p className="mt-3 leading-7 text-cream/70">{item.body}</p>
              <Link
                href={item.href}
                className="mt-5 inline-flex border-b border-glow/60 pb-1 text-sm"
              >
                Descubrir
              </Link>
            </article>
          ))}
        </div>

        <Link
          href={cta.href}
          className="mt-14 inline-flex border-b border-glow pb-1 text-sm font-semibold tracking-[0.14em] text-glow uppercase"
        >
          {cta.label}
        </Link>
      </Reveal>
    </section>
  );
}
