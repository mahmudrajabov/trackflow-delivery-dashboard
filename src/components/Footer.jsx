import React from "react";

const cols = [
  {
    title: "Platforma",
    links: ["Modullar", "Mahsulot", "Narxlar", "Xavfsizlik"],
  },
  {
    title: "Kompaniya",
    links: ["Biz haqimizda", "Karyera", "Bosma nashrlar", "Aloqa"],
  },
  {
    title: "Huquqiy",
    links: ["Maxfiylik", "Shartlar", "Cookie", "GDPR"],
  },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-border bg-card">
      <div className="mx-auto max-w-[120rem] px-6 py-16 lg:px-12 lg:py-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-2.5">
              <span className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-[hsl(222_47%_11%)]">
                <span className="h-3 w-3 rounded-sm bg-gradient-to-br from-[hsl(217_91%_60%)] to-[hsl(160_84%_39%)]" />
              </span>
              <span className="text-xl font-semibold tracking-tight">Visma</span>
            </div>
            <p className="mt-5 max-w-sm text-[0.95rem] text-muted-foreground">
              Sinaptik samaradorlik — biznes mantiqi va nozik estetika uyg'unligi.
              Murakkab ish oqimlarini sezgir tajribaga aylantiramiz.
            </p>
            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm text-muted-foreground">
              <span className="pulse-dot h-2 w-2 rounded-full bg-[hsl(160_84%_39%)]" />
              Tizim ishlamoqda — 99.99% uptime
            </div>
          </div>

          {cols.map((c) => (
            <div key={c.title} className="lg:col-span-2">
              <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground">
                {c.title}
              </h4>
              <ul className="mt-4 flex flex-col gap-3">
                {c.links.map((l) => (
                  <li key={l}>
                    <a
                      href="#"
                      className="text-[0.95rem] text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="lg:col-span-1">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              Ijtimoiy
            </h4>
            <ul className="mt-4 flex flex-col gap-3">
              {["LinkedIn", "X", "GitHub"].map((l) => (
                <li key={l}>
                  <a
                    href="#"
                    className="text-[0.95rem] text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-border pt-8 sm:flex-row sm:items-center">
          <p className="text-sm text-muted-foreground">
            © 2026 Visma. Barcha huquqlar himoyalangan.
          </p>
          <p className="text-sm text-muted-foreground">
            Kristallsimon aniqlik bilan ishlab chiqilgan.
          </p>
        </div>
      </div>
    </footer>
  );
}