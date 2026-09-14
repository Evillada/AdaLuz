import { PublicPageIntro } from "@/components/layout/PublicPageIntro";

export default async function ProductPage(
  props: PageProps<"/productos/[slug]">,
) {
  const { slug } = await props.params;

  return (
    <PublicPageIntro
      eyebrow="Producto"
      title="Los detalles de esta luz llegan pronto"
      body={`Estamos preparando la historia, el aroma y el ritual de “${slug}”. Escríbenos si quieres conocer su disponibilidad.`}
      whatsappMessage={`Hola Adaluz, quiero información sobre ${slug}.`}
    />
  );
}
