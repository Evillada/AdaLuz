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
      title: "Una llama cambia la forma de habitar el tiempo",
      body: "Encender una vela puede abrir una pausa, acompañar una conversación o darle presencia a un momento sencillo. Adaluz nace para esos instantes.",
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

  const collectionName = "Origen";
  const collection = await prisma.collection.upsert({
    where: { slug: slugify(collectionName) },
    update: {
      name: collectionName,
      tagline: "Volver al centro",
      description:
        "Notas cálidas para hacer espacio a la calma y convertir cada pausa en un ritual.",
      coverImageUrl: "/reference/collection-origen.jpg",
      published: true,
      sortOrder: 0,
    },
    create: {
      slug: slugify(collectionName),
      name: collectionName,
      tagline: "Volver al centro",
      description:
        "Notas cálidas para hacer espacio a la calma y convertir cada pausa en un ritual.",
      coverImageUrl: "/reference/collection-origen.jpg",
      published: true,
      sortOrder: 0,
    },
  });

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
        collectionId: collection.id,
        name: product.name,
        description: product.description,
        imageUrl: product.imageUrl,
        available: true,
        sortOrder: product.sortOrder,
      },
      create: {
        collectionId: collection.id,
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
