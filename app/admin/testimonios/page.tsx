import { TestimonialForm } from "@/components/admin/TestimonialForm";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/session";

export default async function TestimonialsAdminPage() {
  await requireAdmin();
  const testimonials = await prisma.testimonial.findMany({
    orderBy: [{ sortOrder: "asc" }, { author: "asc" }],
  });

  return (
    <>
      <header>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ochre">
          Testimonios
        </p>
        <h1 className="mt-2 font-serif text-4xl font-semibold text-bronze">
          Experiencia Adaluz
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-bronze/65">
          Crea, publica y organiza las voces que aparecen en la página de
          inicio.
        </p>
      </header>

      <div className="mt-8 space-y-6">
        <TestimonialForm />

        {testimonials.length ? (
          testimonials.map((testimonial) => (
            <TestimonialForm
              key={testimonial.id}
              testimonial={testimonial}
            />
          ))
        ) : (
          <p className="rounded-xl border border-dashed border-bronze/20 p-6 text-sm text-bronze/60">
            Aún no hay testimonios.
          </p>
        )}
      </div>
    </>
  );
}
