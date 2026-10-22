import type { ReactNode } from "react";

export type SectionCta = {
  label: string;
  href: string;
};

export type EditorialSectionProps = {
  decoration?: ReactNode;
  eyebrow?: string;
  title: string;
  body: string;
  imageUrl?: string;
  cta?: SectionCta;
};
