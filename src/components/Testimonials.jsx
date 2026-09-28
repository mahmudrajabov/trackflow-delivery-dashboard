import React from "react";
import { Quote } from "lucide-react";

const partners = ["MERIDIAN", "ALFA GROUP", "NORDEX", "TEKNOPARK", "ORIENT"];

const testimonials = [
  {
    quote:
      "Visma bizning murakkab ish oqimlarini bir tizimga jamlaydi. Qarorlar endi kunlar emas, soniyalarda qabul qilinadi.",
    name: "Dilshod Karimov",
    role: "Operatsion direktor, Meridian Group",
  },
  {
    quote:
      "Kristallsimon shaffoflik haqiqatan ham oqlangan. Moliya paneli real vaqtda ishlaydi — hisobotlar o'zi tayyorlanadi.",
    name: "Nodira Ahmedova",
    role: "Moliya boshqaruvchisi, Nordex",
  },
  {
    quote:
      "Loyiha salomatligi indikatorlari jamoamizning e'tiborini to'g'ri yo'nalishga qaratdi. Samaradorlik +18% oshdi.",
    name: "Jasur Tolipov",
    role: "Loyiha direktori, Teknopark",
  },
];

export default function Testimonials() {
  return (
    <section className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-[120rem] px-6 lg:px-12">
        {/* partner wordmarks */}
        <p className="text-center text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
          Ishonch bildirgan hamkorlar
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
          {partners.map((p) => (
            <span
              key={p}
              className="text-xl font-semibold tracking-widest text-muted-foreground/60 transition-colors hover:text-foreground"
            >
              {p}
            </span>
          ))}
        </div>

        {/* testimonials */}
        <div className="mt-20 grid grid-cols-1 gap-px overflow-hidden rounded-3xl border border-border lg:grid-cols-3">
          {testimonials.map((t) => (
            <figure
              key={t.name}
              className="group flex flex-col bg-card p-8 transition-colors hover:bg-secondary lg:p-10"
            >
              <Quote className="h-8 w-8 text-[hsl(217_91%_60%/0.35)] transition-colors group-hover:text-[hsl(217_91%_60%)]" />
              <blockquote className="mt-6 flex-1 text-lg leading-relaxed text-foreground">
                {t.quote}
              </blockquote>
              <figcaption className="mt-8 border-t border-border pt-5">
                <p className="font-semibold">{t.name}</p>
                <p className="mt-0.5 text-sm text-muted-foreground">{t.role}</p>
              </figcaption>
            </figure>
          ))}
        </div>

        {/* key stats */}
        <div className="mt-16 grid grid-cols-2 gap-8 text-center lg:grid-cols-4">
          {[
            { value: "340+", label: "Faol korxona" },
            { value: "99.99%", label: "Uptime kafolati" },
            { value: "18%", label: "Samaradorlik o'sishi" },
            { value: "24/7", label: "Qo'llab-quvvatlash" },
          ].map((s) => (
            <div key={s.label}>
              <p className="text-4xl font-semibold tracking-tight lg:text-5xl">{s.value}</p>
              <p className="mt-2 text-sm text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}