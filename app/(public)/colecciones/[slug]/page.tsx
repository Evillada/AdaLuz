import { PublicPageIntro } from "@/components/layout/PublicPageIntro";

export default async function CollectionPage(
  props: PageProps<"/colecciones/[slug]">,
) {
  const { slug } = await props.params;

  return (
    <PublicPageIntro
      eyebrow="Colección"
      title="Esta colección pronto tendrá su propia historia"
      body={`Estamos preparando los aromas y detalles de “${slug}”. Mientras tanto, podemos ayudarte personalmente a encontrar la luz indicada.`}
      whatsappMessage={`Hola Adaluz, quiero conocer la colección ${slug}.`}
    />
  );
}
