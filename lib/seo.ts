import type { SiteSettings } from "@prisma/client";
import type { Metadata } from "next";

const fallbackSiteUrl = "http://localhost:3000";

export function getSiteUrl(): string {
  return (process.env.NEXT_PUBLIC_SITE_URL || fallbackSiteUrl).replace(
    /\/+$/,
    "",
  );
}

export function absoluteUrl(path: string): string {
  if (path === "/") {
    return getSiteUrl();
  }

  return new URL(path, `${getSiteUrl()}/`).toString().replace(/\/+$/, "");
}

type PublicMetadataInput = {
  settings: SiteSettings;
  title: string;
  description: string;
  path: string;
  image?: string | null;
};

export function createPublicMetadata({
  settings,
  title,
  description,
  path,
  image,
}: PublicMetadataInput): Metadata {
  const images = [
    image ?? settings.ogImage ?? "/brand/adaluz-brand-sheet.png",
  ];

  return {
    metadataBase: new URL(getSiteUrl()),
    title: { absolute: title },
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "es_CO",
      siteName: "Adaluz",
      title,
      description,
      url: path,
      images,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images,
    },
  };
}
