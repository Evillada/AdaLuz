import Link from "next/link";

import { OvalFrame } from "@/components/brand/OvalFrame";
import { Reveal } from "@/components/motion/Reveal";
import {
  bodyClass,
  eyebrowClass,
  textLinkClass,
  titleClass,
} from "@/components/ui/styles";

import type { SectionCta } from "./types";

export type CollectionTeaser = {
  title: string;
  body: string;
  imageUrl?: string;
  href: string;
};

type CollectionsTeaserSectionProps = {
  eyebrow?: string;
  title: string;
  body: string;
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
    <section className="px-6 py-20 sm:py-28">
      <Reveal className="mx-auto max-w-6xl">
        <div className="text-center">
          {eyebrow && <p className={eyebrowClass}>{eyebrow}</p>}
          <h2 className={`mt-4 ${titleClass}`}>{title}</h2>
          <p className={`mx-auto mt-5 max-w-xl ${bodyClass}`}>{body}</p>
        </div>

        <ul className="mx-auto mt-12 max-w-md divide-y divide-gold-line/25 border-y border-gold-line/25 md:grid md:max-w-none md:grid-cols-3 md:gap-12 md:divide-y-0 md:border-0">
          {items.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="group flex items-center gap-5 py-5 md:flex-col md:gap-0 md:py-0 md:text-center"
              >
                <OvalFrame
                  imageUrl={item.imageUrl}
                  thin
                  className="aspect-[4/5] w-16 shrink-0 transition-transform duration-700 group-hover:scale-[1.02] md:w-[min(100%,15rem)]"
                />
                <div className="md:mt-8">
                  <h3 className="font-serif text-2xl text-ink md:text-3xl">{item.title}</h3>
                  <p className="mt-1 font-serif text-muted italic">{item.body}</p>
                  <span className="mt-2 inline-block text-[0.68rem] font-semibold tracking-[0.18em] text-gold-ink uppercase">
                    Descubrir →
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-12 text-center">
          <Link href={cta.href} className={textLinkClass}>
            {cta.label}
          </Link>
        </div>
      </Reveal>
    </section>
  );
}
