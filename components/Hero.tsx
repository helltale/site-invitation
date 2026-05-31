"use client";

import Image from "next/image";
import { assets } from "@/lib/design";
import { entranceClass } from "@/hooks/useEntranceAnimation";
import { wedding } from "@/lib/wedding";

type HeroProps = {
  ready: boolean;
};

export function Hero({ ready }: HeroProps) {
  const { groom, bride } = wedding.couple;
  const [day, month] = wedding.date.heroParts;
  const animateClass = entranceClass(ready);

  return (
    <section className="relative overflow-hidden bg-cream px-4 pb-16 pt-10 sm:pt-14">
      <div className="mx-auto flex max-w-[900px] flex-col items-center">
        <Image
          src={assets.hero.ornamentTop}
          alt=""
          width={117}
          height={118}
          className="mb-6 h-auto w-[min(117px,28vw)]"
          priority
        />

        <p
          className={`hero-wedding-day ${animateClass}`}
          style={{ animationDelay: "0.15s" }}
        >
          wedding day
        </p>

        <div className="hero-names-grid grid w-full max-w-[820px] grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-x-2 sm:gap-x-4">
          <span
            className={`hero-date-side hero-date-side--hero ${animateClass} justify-self-start`}
            style={{ animationDelay: "0.55s" }}
          >
            {day}
          </span>

          <div className="text-center">
            <p className="hero-names">{groom.toUpperCase()}</p>
            <p className="hero-names mt-1 sm:mt-2">{bride.toUpperCase()}</p>
          </div>

          <span
            className={`hero-date-side hero-date-side--hero ${animateClass} justify-self-end`}
            style={{ animationDelay: "0.55s" }}
          >
            {month}
          </span>
        </div>

        <p
          className={`hero-date-year hero-date-year--hero ${animateClass}`}
          style={{ animationDelay: "0.75s" }}
        >
          {wedding.date.heroYear}
        </p>
      </div>
    </section>
  );
}
