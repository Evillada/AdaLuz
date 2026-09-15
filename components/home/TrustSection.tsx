import { Reveal } from "@/components/motion/Reveal";

import type { EditorialSectionProps } from "./types";

export type Testimonial = {
  quote: string;
  attribution: string;
};

type TrustSectionProps = EditorialSectionProps & {
  testimonials: Testimonial[];
};

export function TrustSection({
  eyebrow,
  title,
  body,
  testimonials,
}: TrustSectionProps) {
  return (
    <section className="band-warm relative px-6 py-28 sm:py-40">
      <Reveal className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          {eyebrow && (
            <p className="text-xs font-semibold tracking-[0.28em] text-ochre uppercase">
              {eyebrow}
            </p>
          )}
          <div className="gold-rule mt-6" />
          <h2 className="mt-7 font-serif text-4xl leading-[1.05] tracking-[-0.02em] text-bronze sm:text-6xl">
            {title}
          </h2>
          <p className="mt-7 text-lg leading-9 text-[color:var(--ink-soft)]">
            {body}
          </p>
        </div>
        <div className="mt-20 grid gap-12 md:grid-cols-3 md:gap-10">
          {testimonials.map((testimonial, index) => (
            <blockquote
              key={testimonial.attribution}
              className={`border-l border-ochre/40 pl-6 ${index === 1 ? "md:mt-10" : ""}`}
            >
              <p className="font-serif text-2xl leading-snug text-bronze sm:text-[1.7rem]">
                “{testimonial.quote}”
              </p>
              <footer className="mt-6 text-sm tracking-[0.08em] text-bronze/60">
                {testimonial.attribution}
              </footer>
            </blockquote>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
