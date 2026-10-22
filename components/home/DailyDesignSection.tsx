import { CandleArt } from "@/components/candles/CandleArt";
import { CandleFlame } from "@/components/candles/CandleFlame";
import { WhatsAppLink } from "@/components/layout/WhatsAppLink";
import { Reveal } from "@/components/motion/Reveal";
import type { CandleDesign } from "@/lib/candle-designs";

type DailyDesignSectionProps = {
  designs: readonly CandleDesign[];
  todayIndex: number;
  whatsappE164: string;
};

export function DailyDesignSection({
  designs,
  todayIndex,
  whatsappE164,
}: DailyDesignSectionProps) {
  const featured = designs[todayIndex];

  return (
    <section className="band-gold section-blend relative overflow-hidden py-28 sm:py-40">
      <Reveal className="mx-auto grid max-w-6xl items-center gap-12 px-6 lg:grid-cols-[1fr_1fr] lg:gap-20">
        <div className="max-w-xl">
          <p className="text-xs font-semibold tracking-[0.28em] text-ochre uppercase">
            Diseño del día
          </p>
          <div className="gold-rule mt-6" />
          <h2 className="mt-7 font-serif text-5xl leading-[1.02] tracking-[-0.02em] text-bronze sm:text-7xl">
            {featured.name}
          </h2>
          <p className="mt-7 text-lg leading-9 text-[color:var(--ink-soft)]">
            {featured.description}
          </p>
          <p className="mt-5 text-sm leading-7 text-coffee/80">
            Cada día encendemos un diseño distinto. Vuelve mañana y descubre
            el siguiente.
          </p>
          <WhatsAppLink
            e164={whatsappE164}
            label="Quiero este diseño"
            message={`Hola Adaluz, me encantó el diseño ${featured.name}.`}
            className="mt-10 inline-flex border-b border-ochre pb-1.5 text-sm font-semibold tracking-[0.16em] text-bronze uppercase transition-colors hover:text-ochre"
          />
        </div>

        <div className="relative mx-auto flex aspect-square w-[min(100%,28rem)] items-center justify-center">
          <div
            aria-hidden="true"
            className="absolute inset-[8%] rounded-full bg-[radial-gradient(circle,rgba(255,226,138,0.9)_0%,rgba(241,196,63,0.35)_45%,transparent_70%)] blur-xl"
          />
          <div
            aria-hidden="true"
            className="absolute inset-[14%] rounded-full border border-gold-metal/40"
          />
          <div className="candle-turn-stage relative w-44 sm:w-60">
            <CandleArt
              key={featured.id}
              design={featured}
              className="candle-turn h-auto w-full"
              flame={<CandleFlame />}
            />
          </div>
        </div>
      </Reveal>

      <div className="candle-marquee mt-20" aria-label="Diseños de velas Adaluz">
        <div className="candle-marquee-track">
          {[0, 1].map((copy) => (
            <ul
              key={copy}
              aria-hidden={copy === 1 ? true : undefined}
              className="flex shrink-0 gap-6 pr-6 sm:gap-10 sm:pr-10"
            >
              {designs.map((design, index) => (
                <li
                  key={design.id}
                  className={`flex w-28 shrink-0 flex-col items-center rounded-[2rem] px-3 pt-4 pb-5 text-center sm:w-32 ${
                    index === todayIndex
                      ? "bg-cream/70 ring-1 ring-gold-metal/60"
                      : "bg-cream/30"
                  }`}
                >
                  <CandleArt design={design} className="h-auto w-16 sm:w-20" />
                  <span className="mt-3 font-serif text-lg leading-tight text-bronze">
                    {design.name}
                  </span>
                  {index === todayIndex && (
                    <span className="mt-1 text-[0.65rem] font-semibold tracking-[0.2em] text-ochre uppercase">
                      Hoy
                    </span>
                  )}
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}
