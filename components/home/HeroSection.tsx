import type { ReactNode } from "react";

import { AtmosphereMedia } from "@/components/brand/AtmosphereMedia";
import { Logo } from "@/components/brand/Logo";
import { WhatsAppLink } from "@/components/layout/WhatsAppLink";
import { HeroMotion } from "@/components/motion/HeroMotion";

type HeroSectionProps = {
  decoration?: ReactNode;
  title: string;
  slogan?: string;
  body: string;
  imageUrl?: string;
  cta: {
    label: string;
    e164: string;
    message?: string;
  };
};

export function HeroSection({
  decoration,
  title,
  slogan,
  body,
  imageUrl,
  cta,
}: HeroSectionProps) {
  return (
    <section className="relative isolate flex min-h-svh overflow-hidden text-cream">
      {decoration}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-56 bg-[linear-gradient(180deg,rgba(26,16,9,0.82)_0%,rgba(26,16,9,0.45)_45%,transparent_100%)]"
      />
      <div data-stage="hero-media" className="absolute inset-0 -z-20">
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
        className="absolute inset-0 -z-10 bg-[linear-gradient(105deg,rgba(38,24,14,0.9)_0%,rgba(111,74,48,0.7)_42%,rgba(196,154,58,0.28)_74%,rgba(233,205,133,0.14)_100%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(0deg,rgba(38,24,14,0.78)_0%,rgba(63,42,29,0.45)_55%,rgba(63,42,29,0.1)_100%)] lg:hidden"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 top-1/4 h-72 w-72 rounded-full bg-glow/20 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 right-0 h-80 w-80 rounded-full bg-ochre/20 blur-3xl"
      />

      <HeroMotion className="mx-auto flex w-full max-w-6xl items-end px-6 pb-20 pt-40 sm:items-center sm:py-36">
        <div className="max-w-3xl">
          <Logo
            variant="lockup"
            className="w-36 drop-shadow-[0_6px_24px_rgba(240,214,142,0.35)] sm:w-44"
          />
          <div className="gold-rule mt-10 opacity-80" />
          <h1 className="mt-8 max-w-2xl font-serif text-5xl leading-[0.92] font-medium tracking-[-0.02em] text-balance sm:text-7xl lg:text-8xl">
            {title}
          </h1>
          {slogan && (
            <p className="mt-8 max-w-2xl font-serif text-2xl leading-snug text-glow italic sm:text-3xl">
              {slogan}
            </p>
          )}
          <p className="mt-6 max-w-xl text-lg leading-8 text-cream/85 sm:text-xl sm:leading-9">
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
