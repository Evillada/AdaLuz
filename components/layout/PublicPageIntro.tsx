import { WhatsAppLink } from "@/components/layout/WhatsAppLink";

type PublicPageIntroProps = {
  eyebrow?: string;
  title: string;
  body: string;
  whatsappE164?: string;
  whatsappMessage?: string;
};

export function PublicPageIntro({
  eyebrow,
  title,
  body,
  whatsappE164 = "573113187927",
  whatsappMessage,
}: PublicPageIntroProps) {
  return (
    <section className="flex flex-1 px-6 py-24 sm:py-36">
      <div className="mx-auto w-full max-w-6xl">
        <div className="max-w-3xl">
          {eyebrow && (
            <p className="text-xs font-semibold tracking-[0.24em] text-ochre uppercase">
              {eyebrow}
            </p>
          )}
          <h1 className="mt-5 font-serif text-5xl leading-none text-ochre sm:text-7xl">
            {title}
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-bronze/80">
            {body}
          </p>
          <WhatsAppLink
            e164={whatsappE164}
            label="Hablar con Adaluz"
            message={whatsappMessage}
            className="mt-10 inline-flex border-b border-ochre pb-1 text-sm font-semibold tracking-[0.14em] uppercase"
          />
        </div>
      </div>
    </section>
  );
}
