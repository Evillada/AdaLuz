import Link from "next/link";

import { OvalFrame } from "@/components/brand/OvalFrame";
import { Reveal } from "@/components/motion/Reveal";
import {
  bodyClass,
  eyebrowClass,
  textLinkClass,
  titleClass,
} from "@/components/ui/styles";

import type { EditorialSectionProps } from "./types";

type StorySectionProps = EditorialSectionProps & {
  reverse?: boolean;
};

export function StorySection({
  eyebrow,
  title,
  body,
  imageUrl,
  cta,
  reverse = false,
}: StorySectionProps) {
  return (
    <section className="px-6 py-20 sm:py-28">
      <Reveal className="mx-auto grid max-w-5xl items-center gap-12 text-center md:grid-cols-2 md:gap-20 md:text-left">
        <OvalFrame
          imageUrl={imageUrl}
          className={`mx-auto aspect-[4/5] w-[min(70vw,20rem)] ${reverse ? "md:order-2" : ""}`}
        />
        <div>
          {eyebrow && <p className={eyebrowClass}>{eyebrow}</p>}
          <h2 className={`mt-4 ${titleClass}`}>{title}</h2>
          <div className="gold-rule mx-auto mt-6 md:mx-0" />
          <p className={`mt-6 ${bodyClass}`}>{body}</p>
          {cta && (
            <Link href={cta.href} className={`mt-8 ${textLinkClass}`}>
              {cta.label}
            </Link>
          )}
        </div>
      </Reveal>
    </section>
  );
}
