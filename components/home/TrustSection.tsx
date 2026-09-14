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
    <section className="px-6 py-24 sm:py-36">
      <Reveal className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          {eyebrow && (
            <p className="text-xs font-semibold tracking-[0.24em] text-ochre uppercase">
              {eyebrow}
            </p>
          )}
          <h2 className="mt-5 font-serif text-4xl leading-tight text-ochre sm:text-6xl">
            {title}
          </h2>
          <p className="mt-6 text-lg leading-8 text-bronze/80">{body}</p>
        </div>
        <div className="mt-16 grid gap-10 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <blockquote
              key={testimonial.attribution}
              className="border-l border-ochre/50 pl-6"
            >
              <p className="font-serif text-2xl leading-snug">
                “{testimonial.quote}”
              </p>
              <footer className="mt-5 text-sm tracking-wide text-bronze/65">
                {testimonial.attribution}
              </footer>
            </blockquote>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
