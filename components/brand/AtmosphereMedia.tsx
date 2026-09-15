type AtmosphereMediaProps = {
  imageUrl?: string;
  className?: string;
  kenBurns?: boolean;
  tone?: "dark" | "warm" | "light";
  /** soft = friendly rounded + feathered edge; bloom = organic glowing shape; plain = hero full-bleed */
  shape?: "soft" | "bloom" | "plain";
  "data-placeholder"?: string;
};

const toneClass: Record<NonNullable<AtmosphereMediaProps["tone"]>, string> = {
  dark: "atmosphere-fill",
  warm: "bg-gradient-to-br from-ochre/35 via-glow/40 to-bronze/25",
  light: "bg-gradient-to-br from-glow/50 via-cream to-ochre/20",
};

const shapeClass: Record<NonNullable<AtmosphereMediaProps["shape"]>, string> = {
  soft: "media-frame--soft",
  bloom: "media-frame--bloom",
  plain: "",
};

export function AtmosphereMedia({
  imageUrl,
  className = "",
  kenBurns = false,
  tone = "dark",
  shape = "soft",
  "data-placeholder": dataPlaceholder,
}: AtmosphereMediaProps) {
  return (
    <div
      className={`media-frame relative ${shapeClass[shape]} ${className}`}
      data-placeholder={dataPlaceholder}
    >
      <div
        aria-hidden="true"
        className={`absolute inset-0 ${toneClass[tone]}`}
      />
      {imageUrl ? (
        <div
          aria-hidden="true"
          className={`absolute inset-0 bg-cover bg-center ${kenBurns ? "ken-burns" : ""}`}
          style={{ backgroundImage: `url("${imageUrl}")` }}
        />
      ) : (
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-70"
          style={{
            backgroundImage:
              "radial-gradient(circle at 50% 32%, rgba(240,226,168,0.55), transparent 26%), radial-gradient(circle at 42% 70%, rgba(196,160,53,0.18), transparent 40%)",
          }}
        />
      )}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-bronze/25 via-transparent to-cream/10"
      />
    </div>
  );
}
