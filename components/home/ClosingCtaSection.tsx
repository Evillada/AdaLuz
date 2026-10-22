import { BrandWatermark } from "@/components/brand/BrandWatermark";
import { WhatsAppLink } from "@/components/layout/WhatsAppLink";
import { Reveal } from "@/components/motion/Reveal";
import { bodyClass, primaryButtonClass } from "@/components/ui/styles";

type ClosingCtaSectionProps = {
  title: string;
  body: string;
  cta: {
    label: string;
    e164: string;
    message?: string;
  };
};

export function ClosingCtaSection({ title, body, cta }: ClosingCtaSectionProps) {
  return (
    <section className="px-5 py-16 sm:py-24">
      <Reveal className="relative isolate mx-auto max-w-3xl overflow-hidden rounded-[50%/18%] bg-surface px-8 py-16 text-center sm:rounded-[50%/42%] sm:px-16 sm:py-24">
        <BrandWatermark className="top-6 left-1/2 w-32 -translate-x-1/2 sm:w-44" />
        <div className="relative">
          <h2 className="font-serif text-3xl leading-[1.1] text-ink sm:text-5xl">{title}</h2>
          <p className={`mx-auto mt-5 max-w-md ${bodyClass}`}>{body}</p>
          <WhatsAppLink
            e164={cta.e164}
            message={cta.message}
            label={cta.label}
            className={`mt-8 ${primaryButtonClass}`}
          />
        </div>
      </Reveal>
    </section>
  );
}
