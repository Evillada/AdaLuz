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
    <section className="band-gold section-blend relative isolate overflow-hidden px-6 py-28 text-center sm:py-40">
      <div className="absolute inset-0 -z-20 opacity-25">
        <AtmosphereMedia
          imageUrl={imageUrl}
          kenBurns
          tone="warm"
          shape="plain"
          className="absolute inset-0 h-full w-full rounded-none"
        />
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-b from-white/85 via-white/70 to-[#fff8e8]/80"
      />
      <Reveal className="mx-auto max-w-3xl">
        <div className="mx-auto gold-rule opacity-90" />
        <h2 className="mt-8 font-serif text-5xl leading-[0.95] tracking-[-0.02em] text-bronze sm:text-7xl">
          {title}
        </h2>
        <p className="mx-auto mt-8 max-w-xl text-lg leading-9 text-[color:var(--ink-soft)]">
          {body}
        </p>
        <WhatsAppLink
          e164={cta.e164}
          message={cta.message}
          label={cta.label}
          className="mt-12 inline-flex border-b border-ochre pb-1.5 text-sm font-semibold tracking-[0.18em] text-ochre uppercase transition-colors hover:text-bronze"
        />
      </Reveal>
    </section>
  );
}
