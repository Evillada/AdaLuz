import { Reveal } from "@/components/motion/Reveal";
import { bodyClass, eyebrowClass } from "@/components/ui/styles";

export type Testimonial = {
  quote: string;
  attribution: string;
};

type TrustSectionProps = {
  eyebrow?: string;
  title: string;
  body: string;
  testimonials: Testimonial[];
};

export function TrustSection({ eyebrow, title, body, testimonials }: TrustSectionProps) {
  if (testimonials.length === 0) {
    return null;
  }

  return (
    <section className="px-6 py-20 text-center sm:py-28">
      <Reveal className="mx-auto max-w-2xl">
        {eyebrow && <p className={eyebrowClass}>{eyebrow}</p>}
        <h2 className="mt-4 font-serif text-3xl leading-[1.1] text-ink sm:text-5xl">{title}</h2>
        <p className={`mx-auto mt-5 max-w-xl ${bodyClass}`}>{body}</p>
        <div className="mt-12">
          {testimonials.map((testimonial, index) => (
            <figure key={`${testimonial.attribution}-${index}`}>
              {index > 0 && <div aria-hidden="true" className="gold-rule mx-auto my-10" />}
              <blockquote className="font-serif text-2xl leading-snug text-ink italic sm:text-3xl">
                “{testimonial.quote}”
              </blockquote>
              <figcaption className="mt-4 text-sm tracking-[0.08em] text-muted">
                {testimonial.attribution}
              </figcaption>
            </figure>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
