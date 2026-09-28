import React, { useState } from "react";
import { Check } from "lucide-react";

const tiers = [
  {
    name: "Boshlang'ich",
    price: "₸ 120",
    period: "/oy / foydalanuvchi",
    desc: "Kichik jamoalar uchun asosiy boshqaruv.",
    features: ["5 modul", "10 foydalanuvchigacha", "Standart hisobotlar", "Email qo'llab-quvvatlash"],
    cta: "Boshlash",
    highlight: false,
  },
  {
    name: "Professional",
    price: "₸ 280",
    period: "/oy / foydalanuvchi",
    desc: "O'sayotgan korxonalar uchun to'liq ekotizim.",
    features: ["Barcha modullar", "Cheksiz foydalanuvchi", "Real vaqt tahlili", "Avtomatlashtirish", "24/7 qo'llab-quvvatlash"],
    cta: "Demo so'rash",
    highlight: true,
  },
  {
    name: "Korporativ",
    price: "Maxsus",
    period: "shartnoma asosida",
    desc: "Yirik tashkilotlar uchun moslashtirilgan yechim.",
    features: ["Maxsus integratsiyalar", "Dedikatsiyalangan menejer", "SLA kafolati", "On-premise variant", "Auditoriya hisobotlari"],
    cta: "Bog'lanish",
    highlight: false,
  },
];

export default function Pricing() {
  const [pos, setPos] = useState({ x: 50, y: 50 });

  return (
    <section id="pricing" className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-[120rem] px-6 lg:px-12">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-[hsl(217_91%_60%)]">
            Ishonchli konversiya
          </p>
          <h2 className="mt-4 text-balance text-4xl font-semibold leading-[1.05] sm:text-5xl lg:text-6xl">
            Cheksiz rejimsiz narxlar
          </h2>
          <p className="mt-5 text-lg text-muted-foreground">
            Barcha chegaralar fon qiymatining nozik silishlari bilan yaratilgan.
            CTA tugmasi sichqonchangizni kuzatadi.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-3xl border border-border md:grid-cols-3">
          {tiers.map((t) => (
            <div
              key={t.name}
              className={`relative flex flex-col p-8 transition-colors duration-300 ${
                t.highlight ? "bg-card" : "bg-[hsl(210_40%_96%)]"
              }`}
            >
              {t.highlight && (
                <span className="absolute right-8 top-8 rounded-full bg-[hsl(217_91%_60%)] px-3 py-1 text-xs font-medium text-white">
                  Tavsiya
                </span>
              )}
              <h3 className="text-lg font-semibold">{t.name}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{t.desc}</p>
              <div className="mt-6 flex items-baseline gap-1">
                <span className="text-4xl font-semibold tracking-tight">{t.price}</span>
                <span className="text-sm text-muted-foreground">{t.period}</span>
              </div>

              <ul className="mt-8 flex flex-col gap-3">
                {t.features.map((f) => (
                  <li key={f} className="flex items-center gap-3 text-[0.95rem]">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[hsl(160_84%_39%/0.12)] text-[hsl(160_84%_39%)]">
                      <Check className="h-3 w-3" />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>

              <button
                onMouseMove={(e) => {
                  const r = e.currentTarget.getBoundingClientRect();
                  setPos({
                    x: ((e.clientX - r.left) / r.width) * 100,
                    y: ((e.clientY - r.top) / r.height) * 100,
                  });
                }}
                className={`mt-8 inline-flex min-h-[44px] items-center justify-center rounded-xl px-6 py-3.5 font-medium transition-all ${
                  t.highlight
                    ? "text-white shadow-[0_12px_32px_-10px_hsl(217_91%_60%)]"
                    : "border border-border bg-card text-foreground hover:bg-secondary"
                }`}
                style={
                  t.highlight
                    ? {
                        background: `radial-gradient(circle at ${pos.x}% ${pos.y}%, hsl(199 89% 55%), hsl(217 91% 60%))`,
                      }
                    : undefined
                }
              >
                {t.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}