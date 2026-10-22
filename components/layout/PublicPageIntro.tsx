import { WhatsAppLink } from "@/components/layout/WhatsAppLink";
import { PageTransition } from "@/components/motion/PageTransition";
import { bodyClass, eyebrowClass, primaryButtonClass } from "@/components/ui/styles";

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
    <PageTransition>
      <section className="flex flex-1 px-6 py-20 text-center sm:py-28">
        <div className="mx-auto w-full max-w-3xl">
          {eyebrow && <p className={eyebrowClass}>{eyebrow}</p>}
          <h1 className="mt-5 font-serif text-[2.6rem] leading-[1.05] text-ink sm:text-7xl">
            {title}
          </h1>
          <div className="gold-rule mx-auto mt-7" />
          <p className={`mx-auto mt-7 max-w-2xl ${bodyClass}`}>{body}</p>
          <WhatsAppLink
            e164={whatsappE164}
            label="Hablar con Adaluz"
            message={whatsappMessage}
            className={`mt-10 ${primaryButtonClass}`}
          />
        </div>
      </section>
    </PageTransition>
  );
}
