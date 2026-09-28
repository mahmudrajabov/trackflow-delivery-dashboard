import React, { useEffect, useState } from "react";
import { ArrowRight, TrendingUp } from "lucide-react";
import { Image } from "@/components/ui/image";

const HERO_IMG =
  "https://media.base44.com/images/public/6aba7dde19db9f4ae2999cdc/09ff64c1d_generated_41c7dba9.jpg";

const metrics = [
  { label: "Pul oqimi", value: "₸ 4.82M", delta: "+12.4%" },
  { label: "Loyiha salomatligi", value: "98.6%", delta: "+3.1%" },
  { label: "Faiz ishchi", value: "1,284", delta: "+8.0%" },
];

export default function Hero() {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const onScroll = () => setOffset(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="relative overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-28">
      {/* ambient glow */}
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[40rem] w-[40rem] -translate-x-1/2 rounded-full bg-[hsl(217_91%_60%/0.08)] blur-[120px]" />
      <div className="pointer-events-none absolute top-1/3 right-0 h-[30rem] w-[30rem] rounded-full bg-[hsl(160_84%_39%/0.06)] blur-[120px]" />

      <div className="relative mx-auto max-w-[120rem] px-6 lg:px-12">
        <div className="mx-auto max-w-4xl text-center">
          <div className="float-in inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-4 py-1.5 text-sm text-muted-foreground backdrop-blur">
            <span className="pulse-dot h-2 w-2 rounded-full bg-[hsl(160_84%_39%)]" />
            Sinaptik samaradorlik — jonli ma'lumotlar bilan
          </div>

          <h1
            className="float-in mt-8 text-balance text-5xl font-semibold leading-[1.02] sm:text-6xl lg:text-[5.25rem]"
            style={{ animationDelay: "60ms" }}
          >
            Korxona boshqaruvi
            <br />
            <span className="bg-gradient-to-r from-[hsl(217_91%_60%)] via-[hsl(199_89%_48%)] to-[hsl(160_84%_39%)] bg-clip-text text-transparent">
              kristallsimon aniqlikda
            </span>
          </h1>

          <p
            className="float-in mx-auto mt-7 max-w-2xl text-balance text-lg text-muted-foreground sm:text-xl"
            style={{ animationDelay: "120ms" }}
          >
            HR, moliya, logistika va loyihalarni yagona sinaptik tizimda birlashtiring.
            Murakkab jarayonlar sezgir, intuitiv tajribaga aylanadi.
          </p>

          <div
            className="float-in mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
            style={{ animationDelay: "180ms" }}
          >
            <a
              href="#pricing"
              className="group inline-flex min-h-[44px] items-center gap-2 gradient-cta rounded-xl px-7 py-3.5 font-medium text-white shadow-[0_12px_32px_-10px_hsl(217_91%_60%)] transition-transform hover:scale-[1.03]"
            >
              Demo so'rash
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#modules"
              className="inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-border bg-card px-7 py-3.5 font-medium text-foreground transition-colors hover:bg-secondary"
            >
              Modullarni ko'rish
            </a>
          </div>
        </div>

        {/* Intelligence Map */}
        <div
          className="float-in relative mt-16 lg:mt-20"
          style={{ animationDelay: "240ms", transform: `translateY(${offset * -0.04}px)` }}
        >
          <div className="relative overflow-hidden rounded-3xl border border-border bg-card shadow-[0_40px_120px_-40px_rgba(15,23,42,0.25)]">
            <Image
              src={HERO_IMG}
              alt="Minimalistik zamonaviy ofis interyeri — mukammal ishlaydigan ko'rinmas tizim timsoli"
              className="h-[18rem] w-full object-cover sm:h-[26rem] lg:h-[34rem]"
              fittingType="fill"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[hsl(222_47%_11%)]/70 via-[hsl(222_47%_11%)]/20 to-transparent" />

            {/* docked metrics */}
            <div className="absolute inset-x-0 bottom-0 grid grid-cols-1 gap-px sm:grid-cols-3">
              {metrics.map((m, i) => (
                <div
                  key={m.label}
                  className="glass flex items-center justify-between px-6 py-5"
                  style={{ animationDelay: `${300 + i * 80}ms` }}
                >
                  <div>
                    <p className="text-xs uppercase tracking-wider text-white/70">{m.label}</p>
                    <p className="mt-1 text-2xl font-semibold text-white">{m.value}</p>
                  </div>
                  <span className="inline-flex items-center gap-1 rounded-full bg-[hsl(160_84%_39%)]/20 px-2.5 py-1 text-xs font-medium text-[hsl(160_84%_39%)]">
                    <TrendingUp className="h-3 w-3" />
                    {m.delta}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}