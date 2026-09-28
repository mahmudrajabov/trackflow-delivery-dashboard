import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

const links = [
  { label: "Platforma", href: "#platform" },
  { label: "Modullar", href: "#modules" },
  { label: "Mahsulot", href: "#product" },
  { label: "Narxlar", href: "#pricing" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? "py-3" : "py-5"
      }`}
    >
      <div className="mx-auto max-w-[120rem] px-6 lg:px-12">
        <nav
          className={`flex items-center justify-between rounded-2xl px-5 py-3 transition-all duration-500 ${
            scrolled ? "glass shadow-[0_8px_40px_-12px_rgba(15,23,42,0.12)]" : ""
          }`}
        >
          <Link to="/" className="flex items-center gap-2.5">
            <span className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-[hsl(222_47%_11%)]">
              <span className="h-3 w-3 rounded-sm bg-gradient-to-br from-[hsl(217_91%_60%)] to-[hsl(160_84%_39%)]" />
            </span>
            <span className="text-xl font-semibold tracking-tight">Visma</span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="rounded-lg px-4 py-2 text-[0.95rem] text-muted-foreground transition-colors hover:text-foreground hover:bg-secondary"
              >
                {l.label}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <a href="#pricing" className="text-[0.95rem] font-medium text-muted-foreground hover:text-foreground transition-colors">
              Kirish
            </a>
            <a
              href="#pricing"
              className="gradient-cta rounded-xl px-5 py-2.5 text-[0.95rem] font-medium text-white shadow-[0_8px_24px_-8px_hsl(217_91%_60%)] transition-transform hover:scale-[1.03]"
            >
              Demo so'rash
            </a>
          </div>

          <button
            className="md:hidden rounded-lg p-2 text-foreground"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menyu"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </nav>

        {open && (
          <div className="md:hidden mt-2 glass rounded-2xl p-4 shadow-lg">
            <div className="flex flex-col gap-1">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-4 py-3 text-foreground hover:bg-secondary"
                >
                  {l.label}
                </a>
              ))}
              <a
                href="#pricing"
                onClick={() => setOpen(false)}
                className="gradient-cta mt-2 rounded-xl px-5 py-3 text-center font-medium text-white"
              >
                Demo so'rash
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}