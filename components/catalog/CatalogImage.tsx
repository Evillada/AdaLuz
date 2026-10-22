import { OvalFrame } from "@/components/brand/OvalFrame";

type CatalogImageProps = {
  imageUrl: string | null;
  className?: string;
};

export function CatalogImage({ imageUrl, className = "" }: CatalogImageProps) {
  return <OvalFrame imageUrl={imageUrl} thin className={className} />;
}
