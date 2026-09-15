import { AtmosphereMedia } from "@/components/brand/AtmosphereMedia";
import { Logo } from "@/components/brand/Logo";
import { WhatsAppLink } from "@/components/layout/WhatsAppLink";
import { HeroMotion } from "@/components/motion/HeroMotion";

type HeroSectionProps = {
  title: string;
  body: string;
  imageUrl?: string;
  cta: {
    label: string;
    e164: string;
    message?: string;
  };
};

export function HeroSection({
  title,
  body,
  imageUrl,
  cta,
}: HeroSectionProps) {
  return (
    <section className="relative isolate flex min-h-[calc(100svh-5.5rem)] overflow-hidden text-cream">
      <div data-stage="hero-media" className="absolute inset-0 -z-20">
        <AtmosphereMedia
          imageUrl={imageUrl}
          kenBurns
          tone="dark"
          className="absolute inset-0 h-full w-full"
        />
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(105deg,rgba(26,16,10,0.92)_0%,rgba(74,52,38,0.72)_42%,rgba(74,52,38,0.28)_72%,rgba(74,52,38,0.12)_100%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 top-1/4 h-72 w-72 rounded-full bg-glow/20 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 right-0 h-80 w-80 rounded-full bg-ochre/20 blur-3xl"
      />

      <HeroMotion className="mx-auto flex w-full max-w-6xl items-end px-6 pb-20 pt-28 sm:items-center sm:py-32">
        <div className="max-w-3xl">
          <Logo variant="lockup" className="w-40 brightness-0 invert sm:w-52" />
          <div className="gold-rule mt-10 opacity-80" />
          <h1 className="mt-8 max-w-2xl font-serif text-5xl leading-[0.92] font-medium tracking-[-0.02em] text-balance sm:text-7xl lg:text-8xl">
            {title}
          </h1>
          <p className="mt-8 max-w-xl text-lg leading-8 text-cream/85 sm:text-xl sm:leading-9">
            {body}
          </p>
          <WhatsAppLink
            e164={cta.e164}
            message={cta.message}
            label={cta.label}
            className="mt-12 inline-flex border-b border-glow/80 pb-1.5 text-sm font-semibold tracking-[0.2em] text-glow uppercase transition-colors hover:border-cream hover:text-cream"
          />
        </div>
      </HeroMotion>
    </section>
  );
}
