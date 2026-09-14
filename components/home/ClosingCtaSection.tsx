import { WhatsAppLink } from "@/components/layout/WhatsAppLink";
import { Reveal } from "@/components/motion/Reveal";

type ClosingCtaSectionProps = {
  title: string;
  body: string;
  imageUrl?: string;
  cta: {
    label: string;
    e164: string;
    message?: string;
  };
};

export function ClosingCtaSection({
  title,
  body,
  imageUrl,
  cta,
}: ClosingCtaSectionProps) {
  return (
    <section className="relative isolate overflow-hidden bg-bronze px-6 py-24 text-center text-cream sm:py-36">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-cover bg-center opacity-20"
        style={imageUrl ? { backgroundImage: `url("${imageUrl}")` } : undefined}
      />
      <Reveal className="mx-auto max-w-3xl">
        <h2 className="font-serif text-5xl leading-none text-glow sm:text-7xl">
          {title}
        </h2>
        <p className="mx-auto mt-7 max-w-xl text-lg leading-8 text-cream/80">
          {body}
        </p>
        <WhatsAppLink
          e164={cta.e164}
          message={cta.message}
          label={cta.label}
          className="mt-10 inline-flex border-b border-glow pb-1 text-sm font-semibold tracking-[0.16em] text-glow uppercase transition-colors hover:text-cream"
        />
      </Reveal>
    </section>
  );
}
