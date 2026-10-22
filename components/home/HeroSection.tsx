import Link from "next/link";

import { OvalFrame } from "@/components/brand/OvalFrame";
import { WhatsAppLink } from "@/components/layout/WhatsAppLink";
import { Reveal } from "@/components/motion/Reveal";
import {
  bodyClass,
  eyebrowClass,
  primaryButtonClass,
  textLinkClass,
} from "@/components/ui/styles";

import type { SectionCta } from "./types";

type HeroSectionProps = {
  title: string;
  slogan?: string;
  body: string;
  imageUrl?: string;
  primaryCta: SectionCta;
  whatsapp: {
    label: string;
    e164: string;
    message?: string;
  };
};

export function HeroSection({
  title,
  slogan,
  body,
  imageUrl,
  primaryCta,
  whatsapp,
}: HeroSectionProps) {
  return (
    <section className="px-6 pt-10 pb-20 text-center sm:pt-16 sm:pb-28">
      <Reveal className="mx-auto max-w-3xl">
        <p className={eyebrowClass}>Velas artesanales aromáticas</p>
        <h1 className="mt-5 font-serif text-[2.6rem] leading-[1.05] text-ink sm:text-7xl">
          {title}
        </h1>
        {slogan && (
          <p className="mx-auto mt-5 max-w-md font-serif text-xl leading-snug text-muted italic sm:text-2xl">
            {slogan}
          </p>
        )}
      </Reveal>

      <OvalFrame
        stage="hero-media"
        imageUrl={imageUrl}
        halo
        className="mx-auto mt-12 aspect-[4/5] w-[min(72vw,22rem)]"
      />

      <Reveal className="mx-auto mt-12 max-w-xl" delay={0.15}>
        <p className={bodyClass}>{body}</p>
        <div className="mt-8 flex flex-col items-center gap-6 sm:flex-row sm:justify-center">
          <Link href={primaryCta.href} className={primaryButtonClass}>
            {primaryCta.label}
          </Link>
          <WhatsAppLink
            e164={whatsapp.e164}
            message={whatsapp.message}
            label={whatsapp.label}
            className={textLinkClass}
          />
        </div>
      </Reveal>
    </section>
  );
}
