type OvalFrameProps = {
  imageUrl?: string | null;
  halo?: boolean;
  thin?: boolean;
  className?: string;
  stage?: string;
};

export function OvalFrame({
  imageUrl,
  halo = false,
  thin = false,
  className = "",
  stage,
}: OvalFrameProps) {
  return (
    <div className={`relative isolate ${className}`} data-stage={stage}>
      {halo && <div aria-hidden="true" className="oval-halo" />}
      <div
        className={`oval-frame ${thin ? "oval-frame--thin" : ""} relative h-full w-full overflow-hidden bg-surface`}
        data-placeholder={imageUrl ? undefined : "cream"}
      >
        {imageUrl ? (
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url("${imageUrl}")` }}
          />
        ) : (
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[radial-gradient(circle_at_50%_38%,var(--halo),transparent_60%)]"
          />
        )}
      </div>
    </div>
  );
}
