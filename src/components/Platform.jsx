import React from "react";
import { Gauge, Layers, Sparkles, Lock } from "lucide-react";

const features = [
  {
    icon: Gauge,
    title: "Tezkor qaror",
    desc: "Soniyalarda ko'rinish — real vaqt ma'lumotlari bilan strategik tushunchalar.",
  },
  {
    icon: Layers,
    title: "Modulli arxitektura",
    desc: "Har bir modul mustaqil, lekin bir butun ekotizim sifatida sinxron ishlaydi.",
  },
  {
    icon: Sparkles,
    title: "Sinaptik tilda",
    desc: "Biznes mantiq nozik estetikaga aylanadi — dastur emas, raqobat ustunligi.",
  },
  {
    icon: Lock,
    title: "Korporativ xavfsizlik",
    desc: "ISO 27001, GDPR va AAA darajadagi kontrast nisbati bilan to'liq moslik.",
  },
];

export default function Platform() {
  return (
    <section id="platform" className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-[120rem] px-6 lg:px-12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:h-fit">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-[hsl(217_91%_60%)]">
              Arxitektura intellekti
            </p>
            <h2 className="mt-4 text-balance text-4xl font-semibold leading-[1.05] sm:text-5xl">
              Operatsion uyg'unlikning keyingi evolyutsiyasi
            </h2>
            <p className="mt-5 text-lg text-muted-foreground">
              Kristallsimon shaffoflik, suyuq ma'lumotlar tuzilmasi va yuqori aniqlikdagi
              prezitsiya orqali murakkab ish oqimlarini sezgir tajribaga aylantiramiz.
            </p>
            <div className="mt-8 flex items-center gap-6">
              <div>
                <p className="text-4xl font-semibold tracking-tight">14.8:1</p>
                <p className="text-sm text-muted-foreground">Kontrast nisbati</p>
              </div>
              <div className="h-12 w-px bg-border" />
              <div>
                <p className="text-4xl font-semibold tracking-tight">1.618</p>
                <p className="text-sm text-muted-foreground">Oltin nisbat ritmi</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-px overflow-hidden rounded-3xl border border-border sm:grid-cols-2">
            {features.map((f) => {
              const Icon = f.icon;
              return (
                <div
                  key={f.title}
                  className="group bg-card p-8 transition-colors hover:bg-secondary"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-secondary text-foreground transition-colors group-hover:bg-[hsl(217_91%_60%)] group-hover:text-white">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold">{f.title}</h3>
                  <p className="mt-2 text-[0.95rem] text-muted-foreground">{f.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}