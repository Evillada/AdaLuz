import { ClosingCtaSection } from "@/components/home/ClosingCtaSection";
import { CollectionsTeaserSection } from "@/components/home/CollectionsTeaserSection";
import { CorporateGiftsSection } from "@/components/home/CorporateGiftsSection";
import { CraftSection } from "@/components/home/CraftSection";
import { HeroSection } from "@/components/home/HeroSection";
import { LightInLifeSection } from "@/components/home/LightInLifeSection";
import { TrustSection } from "@/components/home/TrustSection";

const whatsappE164 = "573113187927";

export default function Home() {
  return (
    <>
      <HeroSection
        title="La luz que acompaña tu vida"
        body="Creamos velas para convertir lo cotidiano en ritual y guardar en la memoria aquello que merece permanecer."
        cta={{
          e164: whatsappE164,
          label: "Encuentra tu luz",
          message: "Hola Adaluz, quiero encontrar una vela para mi ritual.",
        }}
      />
      <LightInLifeSection
        eyebrow="La luz en la vida"
        title="Una llama cambia la forma de habitar el tiempo"
        body="Encender una vela puede abrir una pausa, acompañar una conversación o darle presencia a un momento sencillo. Adaluz nace para esos instantes."
      />
      <CollectionsTeaserSection
        eyebrow="Colecciones"
        title="Aromas con una historia propia"
        body="Cada colección interpreta una manera de sentir la luz: serena, cercana o celebratoria."
        items={[
          {
            title: "Origen",
            body: "Notas cálidas para volver al centro y hacer espacio a la calma.",
            href: "/colecciones/origen",
          },
          {
            title: "Encuentro",
            body: "Una luz generosa para mesas compartidas y conversaciones largas.",
            href: "/colecciones/encuentro",
          },
          {
            title: "Renacer",
            body: "Aromas luminosos para marcar comienzos y abrir nuevas etapas.",
            href: "/colecciones/renacer",
          },
        ]}
        cta={{ label: "Ver todas las colecciones", href: "/colecciones" }}
      />
      <CraftSection
        eyebrow="Oficio"
        title="Hechas despacio, para encenderse sin prisa"
        body="Trabajamos cada vela en pequeños lotes, cuidando la mezcla, el aroma y el acabado. La mano detrás del objeto también hace parte de su luz."
      />
      <CorporateGiftsSection
        eyebrow="Detalles con intención"
        title="Para quienes regalan luz"
        body="Creamos obsequios para equipos, clientes y celebraciones que quieren decir algo verdadero: gracias, bienvenidos, seguimos juntos."
        cta={{ label: "Conoce las opciones para empresas", href: "/para-empresas" }}
      />
      <TrustSection
        eyebrow="Confianza"
        title="Luz que permanece en la memoria"
        body="Historias de personas que eligieron Adaluz para acompañar momentos importantes."
        testimonials={[
          {
            quote: "La encendimos en nuestra nueva casa y el espacio se sintió nuestro.",
            attribution: "Mariana · Medellín",
          },
          {
            quote: "El regalo habló de cuidado desde antes de abrirlo.",
            attribution: "Laura · Bogotá",
          },
          {
            quote: "Adaluz convirtió una cena sencilla en un recuerdo.",
            attribution: "Camilo · Cali",
          },
        ]}
      />
      <ClosingCtaSection
        title="Hagamos luz juntos"
        body="Cuéntanos qué momento quieres acompañar y te ayudaremos a encontrar la vela indicada."
        cta={{
          e164: whatsappE164,
          label: "Hablar con Adaluz",
          message: "Hola Adaluz, quiero elegir una vela.",
        }}
      />
    </>
  );
}
