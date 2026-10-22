export type SectionCta = {
  label: string;
  href: string;
};

export type EditorialSectionProps = {
  eyebrow?: string;
  title: string;
  body: string;
  imageUrl?: string;
  cta?: SectionCta;
};
