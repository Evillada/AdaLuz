import type { ReactNode } from "react";

import { BrandWatermark } from "@/components/brand/BrandWatermark";
import { Reveal } from "@/components/motion/Reveal";
import { bodyClass, eyebrowClass, titleClass } from "@/components/ui/styles";

const pillars: { title: string; body: string; icon: ReactNode }[] = [
  {
    title: "Calma",
    body: "Una pausa para ti",
    icon: (
      <>
        <circle cx="12" cy="6" r="2.5" />
        <path d="M5 19c2-5 12-5 14 0M8 13c1.5 1 6.5 1 8 0" />
      </>
    ),
  },
  {
    title: "Amor",
    body: "Para cuidar y regalar",
    icon: <path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.6-7 10-7 10Z" />,
  },
  {
    title: "Hogar",
    body: "Calidez en cada rincón",
    icon: <path d="M4 11l8-6 8 6v8H4zM10 19v-5h4v5" />,
  },
  {
    title: "Hecho a mano",
    body: "En pequeños lotes",
    icon: (
      <path d="M7 13V6a1.5 1.5 0 0 1 3 0v5M10 11V4.5a1.5 1.5 0 0 1 3 0V11M13 11V6a1.5 1.5 0 0 1 3 0v7c0 4-2.5 7-6 7s-5-2-6-5l-1-3a1.4 1.4 0 0 1 2.5-1L7 13" />
    ),
  },
];

type EssenceSectionProps = {
  eyebrow?: string;
  title: string;
  body: string;
};

export function EssenceSection({ eyebrow, title, body }: EssenceSectionProps) {
  return (
    <section className="relative overflow-hidden px-6 py-20 text-center sm:py-28">
      <BrandWatermark className="top-6 -right-16 w-48 sm:right-[8%] sm:w-64" />
      <Reveal className="relative mx-auto max-w-3xl">
        {eyebrow && <p className={eyebrowClass}>{eyebrow}</p>}
        <h2 className={`mt-4 ${titleClass}`}>{title}</h2>
        <div className="gold-rule mx-auto mt-6" />
        <p className={`mx-auto mt-6 max-w-xl ${bodyClass}`}>{body}</p>
        <ul className="mx-auto mt-12 grid max-w-2xl grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4">
          {pillars.map((pillar) => (
            <li key={pillar.title}>
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="mx-auto h-7 w-7 stroke-gold-ink"
                fill="none"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {pillar.icon}
              </svg>
              <p className="mt-3 font-serif text-xl text-ink">{pillar.title}</p>
              <p className="mt-1 text-sm text-muted">{pillar.body}</p>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
