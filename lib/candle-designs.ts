export type CandleShape = "rose" | "peony" | "dahlia" | "heart";

export type CandleDesign = {
  id: string;
  name: string;
  description: string;
  shape: CandleShape;
  petal: string;
  petalShade: string;
  center?: string;
};

export const candleDesigns = [
  {
    id: "rosa-aurora",
    name: "Rosa Aurora",
    description: "Pilar blanco coronado con una rosa rosada esculpida a mano.",
    shape: "rose",
    petal: "#f48fa6",
    petalShade: "#d9587a",
  },
  {
    id: "lila-serena",
    name: "Lila Serena",
    description: "Rosa en tono lila suave para rincones tranquilos.",
    shape: "rose",
    petal: "#c9a3d4",
    petalShade: "#9a6fae",
  },
  {
    id: "dalia-violeta",
    name: "Dalia Violeta",
    description: "Dalia de pétalos finos en violeta profundo con centro dorado.",
    shape: "dahlia",
    petal: "#6a4ba3",
    petalShade: "#45307a",
    center: "#f1c43f",
  },
  {
    id: "rosa-dorada",
    name: "Rosa Dorada",
    description: "Una rosa en dorado miel que brilla incluso apagada.",
    shape: "rose",
    petal: "#f0c35a",
    petalShade: "#c38f1d",
  },
  {
    id: "peonia-malva",
    name: "Peonía Malva",
    description: "Peonía de pétalos redondos en malva empolvado.",
    shape: "peony",
    petal: "#c48ba3",
    petalShade: "#94607a",
  },
  {
    id: "amor-y-amistad",
    name: "Amor y Amistad",
    description: "Corazón dorado con alas trenzadas para regalar cariño.",
    shape: "heart",
    petal: "#e9b949",
    petalShade: "#b98517",
  },
  {
    id: "margarita-miel",
    name: "Margarita Miel",
    description: "Flor de pétalos largos en ámbar con centro cálido.",
    shape: "dahlia",
    petal: "#f2b548",
    petalShade: "#c9851c",
    center: "#7a4a1f",
  },
  {
    id: "peonia-coral",
    name: "Peonía Coral",
    description: "Peonía coral que llena de vida cualquier mesa.",
    shape: "peony",
    petal: "#f59a86",
    petalShade: "#d86a55",
  },
] as const satisfies readonly CandleDesign[];

export type CandleDesignId = (typeof candleDesigns)[number]["id"];

export function getCandleDesign(id: CandleDesignId): CandleDesign {
  return candleDesigns.find((design) => design.id === id)!;
}

const BOGOTA_OFFSET_MS = 5 * 60 * 60 * 1000;
const DAY_MS = 24 * 60 * 60 * 1000;

/** Picks the featured design for the calendar day in Colombia (UTC-5), cycling through the catalog. */
export function getDesignOfTheDayIndex(date: Date): number {
  const day = Math.floor((date.getTime() - BOGOTA_OFFSET_MS) / DAY_MS);
  const length = candleDesigns.length;

  return ((day % length) + length) % length;
}
