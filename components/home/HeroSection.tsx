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
    <section className="relative isolate flex min-h-[calc(100svh-6rem)] overflow-hidden bg-bronze text-cream">
      <div
        data-stage="hero-media"
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-cover bg-center opacity-30"
        style={imageUrl ? { backgroundImage: `url("${imageUrl}")` } : undefined}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(74,52,38,0.98)_0%,rgba(74,52,38,0.82)_48%,rgba(74,52,38,0.28)_100%)]"
      />

      <HeroMotion className="mx-auto flex w-full max-w-6xl items-center px-6 py-24 sm:py-32">
        <div className="max-w-3xl">
          <Logo variant="lockup" className="w-36 brightness-0 invert sm:w-48" />
          <h1 className="mt-10 max-w-2xl font-serif text-5xl leading-[0.95] font-medium text-balance sm:text-7xl lg:text-8xl">
            {title}
          </h1>
          <p className="mt-8 max-w-xl text-lg leading-8 text-cream/85 sm:text-xl">
            {body}
          </p>
          <WhatsAppLink
            e164={cta.e164}
            message={cta.message}
            label={cta.label}
            className="mt-10 inline-flex border-b border-glow pb-1 text-sm font-semibold tracking-[0.18em] text-glow uppercase transition-colors hover:text-cream"
          />
        </div>
      </HeroMotion>
    </section>
  );
}
