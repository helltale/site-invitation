import Image from "next/image";
import { assets } from "@/lib/design";
import { wedding } from "@/lib/wedding";

export function Hero() {
  const { groom, bride } = wedding.couple;
  const [day, month] = wedding.date.heroParts;

  return (
    <section className="relative overflow-hidden bg-cream px-4 pb-16 pt-10 sm:pt-14">
      <div className="mx-auto flex max-w-[900px] flex-col items-center animate-fade-in">
        <Image
          src={assets.hero.ornamentTop}
          alt=""
          width={117}
          height={118}
          className="mb-6 h-auto w-[min(117px,28vw)]"
          priority
        />

        <p className="hero-wedding-day">wedding day</p>

        <div className="mt-8 grid w-full max-w-[820px] grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-x-2 sm:mt-10 sm:gap-x-4">
          <span className="hero-date-side justify-self-start">{day}</span>

          <div className="text-center">
            <p className="hero-names">{groom.toUpperCase()}</p>
            <p className="hero-names mt-1 sm:mt-2">{bride.toUpperCase()}</p>
          </div>

          <span className="hero-date-side justify-self-end">{month}</span>
        </div>

        <p className="hero-date-year mt-10 sm:mt-12">{wedding.date.heroYear}</p>
      </div>
    </section>
  );
}
