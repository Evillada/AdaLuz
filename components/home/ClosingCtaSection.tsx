import { AtmosphereMedia } from "@/components/brand/AtmosphereMedia";
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
    <section className="band-bronze section-blend section-blend--dark relative isolate overflow-hidden px-6 py-28 text-center sm:py-40">
      <div className="absolute inset-0 -z-20 opacity-40">
        <AtmosphereMedia
          imageUrl={imageUrl}
          kenBurns
          tone="dark"
          shape="plain"
          className="absolute inset-0 h-full w-full rounded-none"
        />
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-bronze/70"
      />
      <Reveal className="mx-auto max-w-3xl">
        <div className="mx-auto gold-rule opacity-90" />
        <h2 className="mt-8 font-serif text-5xl leading-[0.95] tracking-[-0.02em] text-glow sm:text-7xl">
          {title}
        </h2>
        <p className="mx-auto mt-8 max-w-xl text-lg leading-9 text-cream/80">
          {body}
        </p>
        <WhatsAppLink
          e164={cta.e164}
          message={cta.message}
          label={cta.label}
          className="mt-12 inline-flex border-b border-glow pb-1.5 text-sm font-semibold tracking-[0.18em] text-glow uppercase transition-colors hover:border-cream hover:text-cream"
        />
      </Reveal>
    </section>
  );
}
