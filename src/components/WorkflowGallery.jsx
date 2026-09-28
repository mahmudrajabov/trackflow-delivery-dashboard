import React from "react";
import { Users, Wallet, Truck, ShieldCheck, BarChart3, Workflow } from "lucide-react";

const modules = [
  {
    icon: Users,
    title: "HR va Kadrlar",
    desc: "1,284 faol ishchi. Ish vaqti, maosh va baynalmilal solishtirma bitta oqimda.",
    span: "lg:col-span-7",
    stat: "98.6%",
    statLabel: "samaradorlik",
  },
  {
    icon: Wallet,
    title: "Moliya",
    desc: "Pul oqimi va byudjet real vaqtda sinxronlashadi.",
    span: "lg:col-span-5",
    stat: "₸ 4.82M",
    statLabel: "oylik oqim",
  },
  {
    icon: Truck,
    title: "Logistika",
    desc: "Yetkazib berish zanjiri shaffof va kuzatiladigan.",
    span: "lg:col-span-5",
    stat: "99.2%",
    statLabel: "yetkazish",
  },
  {
    icon: BarChart3,
    title: "Loyiha salomatligi",
    desc: "Har bir loyiha uchun jonli KPI va xavf indikatorlari.",
    span: "lg:col-span-7",
    stat: "+12.4%",
    statLabel: "o'sish",
  },
  {
    icon: ShieldCheck,
    title: "Xavfsizlik va moslik",
    desc: "ISO 27001 va GDPR standartlariga to'liq moslik.",
    span: "lg:col-span-4",
    stat: "AAA",
    statLabel: "reiting",
  },
  {
    icon: Workflow,
    title: "Avtomatlashtirish",
    desc: "Takroriy jarayonlarni shaxsiy ish oqimlariga ulang.",
    span: "lg:col-span-4",
    stat: "240+",
    statLabel: "shablon",
  },
  {
    icon: BarChart3,
    title: "Tahlil va hisobot",
    desc: "Ma'lumotlardan strategik tushunchalarga bir daqiqada.",
    span: "lg:col-span-4",
    stat: "real-time",
    statLabel: "panel",
  },
];

export default function WorkflowGallery() {
  return (
    <section id="modules" className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-[120rem] px-6 lg:px-12">
        <div className="max-w-3xl">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-[hsl(217_91%_60%)]">
            Modulli ish oqimi
          </p>
          <h2 className="mt-4 text-balance text-4xl font-semibold leading-[1.05] sm:text-5xl lg:text-6xl">
            Bento galereyasi — ekotizim kengligi, bir nazarda
          </h2>
          <p className="mt-5 text-lg text-muted-foreground">
            Har bir modul o'z kengligida nafas oladi. Sichqonchani olib borganda,
            ichki vizualizatsiya "jonli" holatga o'tadi.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-4 lg:grid-cols-12">
          {modules.map((m, i) => {
            const Icon = m.icon;
            return (
              <article
                key={m.title}
                className={`group relative overflow-hidden rounded-3xl border border-border bg-card p-7 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_30px_80px_-30px_rgba(15,23,42,0.18)] ${m.span}`}
              >
                <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-[hsl(217_91%_60%/0.08)] blur-3xl" />
                </div>

                <div className="relative flex items-start justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary text-foreground transition-colors duration-500 group-hover:bg-[hsl(217_91%_60%)] group-hover:text-white">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-semibold tracking-tight">{m.stat}</p>
                    <p className="text-xs uppercase tracking-wider text-muted-foreground">{m.statLabel}</p>
                  </div>
                </div>

                <h3 className="relative mt-6 text-xl font-semibold">{m.title}</h3>
                <p className="relative mt-2 text-[0.95rem] text-muted-foreground">{m.desc}</p>

                {/* live bar */}
                <div className="relative mt-6 h-1.5 w-full overflow-hidden rounded-full bg-secondary">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[hsl(217_91%_60%)] to-[hsl(160_84%_39%)] transition-all duration-700 group-hover:w-[88%]"
                    style={{ width: `${60 + (i % 4) * 8}%` }}
                  />
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}