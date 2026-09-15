import { AtmosphereMedia } from "@/components/brand/AtmosphereMedia";

type CatalogImageProps = {
  imageUrl: string | null;
  className?: string;
};

export function CatalogImage({ imageUrl, className = "" }: CatalogImageProps) {
  return (
    <AtmosphereMedia
      imageUrl={imageUrl ?? undefined}
      tone={imageUrl ? "dark" : "warm"}
      shape="soft"
      className={className}
      data-placeholder={imageUrl ? undefined : "cream"}
    />
  );
}
