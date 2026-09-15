type CatalogImageProps = {
  imageUrl: string | null;
  className?: string;
};

export function CatalogImage({ imageUrl, className = "" }: CatalogImageProps) {
  if (!imageUrl) {
    return (
      <div
        aria-hidden="true"
        data-placeholder="cream"
        className={`bg-cream ${className}`}
      />
    );
  }

  return (
    <div
      role="img"
      aria-label="Imagen del producto"
      className={`bg-cover bg-center ${className}`}
      style={{ backgroundImage: `url("${imageUrl}")` }}
    />
  );
}
