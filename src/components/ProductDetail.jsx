import React from "react";
import { Image } from "@/components/ui/image";
import { Check } from "lucide-react";

const PRODUCT_IMG =
  "https://media.base44.com/images/public/6aba7dde19db9f4ae2999cdc/4c9fa824a_generated_0a9f101f.jpg";

const benefits = [
  {
    title: "Sinaptik tezlik",
    desc: "Ma'lumotlar kristall kabi shaffof va bir zumda yetib boradi — qarorlar soniyalarda.",
  },
  {
    title: "Nafas oladigan tartib",
    desc: "12-ustunli grid va oltin nisbat ritmi murakkablikni intuitiv muvozanatga aylantiradi.",
  },
  {
    title: "Ko'rinmas tizim",
    desc: "Platforma orqada mukammal ishlaydi — siz faqat natijani ko'rasiz.",
  },
  {
    title: "Jonli ulanish",
    desc: "Pulse indikatorlari har bir ma'lumot nuqtasining real vaqtda ekanligini bildiradi.",
  },
];

export default function ProductDetail() {
  return (
    <section id="product" className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-[120rem] px-6 lg:px-12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          {/* sticky image */}
          <div className="lg:sticky lg:top-28 lg:h-fit">
            <div className="relative overflow-hidden rounded-3xl border border-border bg-card shadow-[0_40px_120px_-40px_rgba(15,23,42,0.25)]">
              <Image
                src={PRODUCT_IMG}
                alt="Yuqori darajadagi apparat komponentlari makro surati — mukammal ishlaydigan ko'rinmas tizim"
                className="h-[24rem] w-full object-cover sm:h-[34rem] lg:h-[42rem]"
                fittingType="fill"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[hsl(222_47%_11%)]/40 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 glass rounded-2xl px-5 py-4">
                <div className="flex items-center gap-2">
                  <span className="pulse-dot h-2 w-2 rounded-full bg-[hsl(160_84%_39%)]" />
                  <span className="text-sm font-medium text-white">Jonli interfeys — real vaqt rejimi</span>
                </div>
              </div>
            </div>
          </div>

          {/* scrollable narrative */}
          <div className="flex flex-col">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-[hsl(217_91%_60%)]">
              Chuqur mantiq
            </p>
            <h2 className="mt-4 text-balance text-4xl font-semibold leading-[1.05] sm:text-5xl">
              Texnik qiziqishni yetakchilikka aylantiring
            </h2>
            <p className="mt-5 text-lg text-muted-foreground">
              Split-ekran tartibi: chap tomonda yuqori aniqlikdagi interfeys,
              o'ng tomonda keng tipografik hikoya — nozik vertikal chiziqlar bilan ajratilgan.
            </p>

            <div className="mt-10 flex flex-col">
              {benefits.map((b, i) => (
                <div
                  key={b.title}
                  className="flex gap-5 border-l border-border py-6 pl-6 first:pt-0 last:pb-0"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[hsl(217_91%_60%/0.1)] text-[hsl(217_91%_60%)]">
                    <Check className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">{b.title}</h3>
                    <p className="mt-1.5 text-[0.95rem] text-muted-foreground">{b.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <a
              href="#pricing"
              className="mt-10 inline-flex w-fit items-center gap-2 gradient-cta rounded-xl px-7 py-3.5 font-medium text-white shadow-[0_12px_32px_-10px_hsl(217_91%_60%)] transition-transform hover:scale-[1.03]"
            >
              Mahsulotni sinab ko'rish
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}