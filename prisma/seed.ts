import { hash } from "bcryptjs";

import { prisma } from "../lib/db";
import { slugify } from "../lib/slug";

function requiredEnv(name: "ADMIN_EMAIL" | "ADMIN_PASSWORD"): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(`${name} is required to seed the database.`);
  }

  return value;
}

async function main() {
  const adminEmail = requiredEnv("ADMIN_EMAIL");
  const adminPassword = requiredEnv("ADMIN_PASSWORD");
  const passwordHash = await hash(adminPassword, 12);

  await prisma.adminUser.upsert({
    where: { email: adminEmail },
    update: { passwordHash },
    create: { email: adminEmail, passwordHash },
  });

  await prisma.siteSettings.upsert({
    where: { id: "default" },
    update: {
      phone: "3113187927",
      whatsappE164: "573113187927",
      instagramHandle: "@velasadaluz",
      instagramUrl: "https://www.instagram.com/velasadaluz",
      seoTitle: "Adaluz | Velas artesanales para momentos con intención",
      seoDescription:
        "Velas artesanales creadas en Colombia para acompañar rituales, regalos y momentos que merecen permanecer.",
      ogImage: "/reference/og.jpg",
    },
    create: {
      id: "default",
      phone: "3113187927",
      whatsappE164: "573113187927",
      instagramHandle: "@velasadaluz",
      instagramUrl: "https://www.instagram.com/velasadaluz",
      seoTitle: "Adaluz | Velas artesanales para momentos con intención",
      seoDescription:
        "Velas artesanales creadas en Colombia para acompañar rituales, regalos y momentos que merecen permanecer.",
      ogImage: "/reference/og.jpg",
    },
  });

  const sections = [
    {
      key: "home.hero",
      title: "La luz que acompaña tu vida",
      body: "Creamos velas para convertir lo cotidiano en ritual y guardar en la memoria aquello que merece permanecer.",
      imageUrl: "/reference/hero.jpg",
      ctaLabel: "Encuentra tu luz",
      sortOrder: 0,
    },
    {
      key: "home.value",
      title: "Amor hecho luz",
      body: "Cada vela nace de un gesto de cariño: hacia ti, hacia tu casa o hacia alguien que quieres.",
      imageUrl: "/reference/value.jpg",
      ctaLabel: null,
      sortOrder: 1,
    },
    {
      key: "home.craft",
      title: "Hechas despacio, para encenderse sin prisa",
      body: "Trabajamos cada vela en pequeños lotes, cuidando la mezcla, el aroma y el acabado. La mano detrás del objeto también hace parte de su luz.",
      imageUrl: "/reference/craft.jpg",
      ctaLabel: null,
      sortOrder: 2,
    },
    {
      key: "home.gift",
      title: "Para quienes regalan luz",
      body: "Creamos obsequios para equipos, clientes y celebraciones que quieren decir algo verdadero: gracias, bienvenidos, seguimos juntos.",
      imageUrl: "/reference/gift.jpg",
      ctaLabel: "Conoce las opciones para empresas",
      sortOrder: 3,
    },
    {
      key: "home.closing",
      title: "Hagamos luz juntos",
      body: "Cuéntanos qué momento quieres acompañar y te ayudaremos a encontrar la vela indicada.",
      imageUrl: "/reference/closing.jpg",
      ctaLabel: "Hablar con Adaluz",
      sortOrder: 4,
    },
  ];

  for (const section of sections) {
    await prisma.pageSection.upsert({
      where: { key: section.key },
      update: section,
      create: section,
    });
  }

  const collections = [
    {
      name: "Origen",
      tagline: "Volver al centro",
      description:
        "Notas cálidas para hacer espacio a la calma y convertir cada pausa en un ritual.",
      coverImageUrl: "/reference/collection-origen.jpg",
      sortOrder: 0,
    },
    {
      name: "Calma",
      tagline: "Respirar despacio",
      description:
        "Aromas suaves para acompañar pausas, lecturas y mañanas sin prisa.",
      coverImageUrl: "/reference/collection-calma.jpg",
      sortOrder: 1,
    },
    {
      name: "Ritual",
      tagline: "Encender con intención",
      description:
        "Velas para cerrar el día, marcar un encuentro o crear un momento propio.",
      coverImageUrl: "/reference/collection-ritual.jpg",
      sortOrder: 2,
    },
  ];

  const seededCollections = [];
  for (const item of collections) {
    const collection = await prisma.collection.upsert({
      where: { slug: slugify(item.name) },
      update: {
        name: item.name,
        tagline: item.tagline,
        description: item.description,
        coverImageUrl: item.coverImageUrl,
        published: true,
        sortOrder: item.sortOrder,
      },
      create: {
        slug: slugify(item.name),
        name: item.name,
        tagline: item.tagline,
        description: item.description,
        coverImageUrl: item.coverImageUrl,
        published: true,
        sortOrder: item.sortOrder,
      },
    });
    seededCollections.push(collection);
  }

  const origen = seededCollections[0]!;

  const products = [
    {
      name: "Luz de Ámbar",
      description: "Una vela cálida y envolvente para cerrar el día con calma.",
      imageUrl: "/reference/product-ambar.jpg",
      sortOrder: 0,
    },
    {
      name: "Bosque Sereno",
      description: "Notas verdes y amaderadas para respirar más despacio.",
      imageUrl: "/reference/product-bosque.jpg",
      sortOrder: 1,
    },
  ];

  for (const product of products) {
    await prisma.product.upsert({
      where: { slug: slugify(product.name) },
      update: {
        collectionId: origen.id,
        name: product.name,
        description: product.description,
        imageUrl: product.imageUrl,
        available: true,
        sortOrder: product.sortOrder,
      },
      create: {
        collectionId: origen.id,
        slug: slugify(product.name),
        name: product.name,
        description: product.description,
        imageUrl: product.imageUrl,
        available: true,
        sortOrder: product.sortOrder,
      },
    });
  }

  const testimonials = [
    {
      quote: "La encendimos en nuestra nueva casa y el espacio se sintió nuestro.",
      author: "Mariana · Medellín",
      published: true,
      sortOrder: 0,
    },
    {
      quote: "El regalo habló de cuidado desde antes de abrirlo.",
      author: "Laura · Bogotá",
      published: true,
      sortOrder: 1,
    },
  ];

  await prisma.testimonial.deleteMany({
    where: { quote: { in: testimonials.map(({ quote }) => quote) } },
  });
  await prisma.testimonial.createMany({ data: testimonials });
}

main()
  .catch((error: unknown) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
