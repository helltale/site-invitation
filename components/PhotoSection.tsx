import Image from "next/image";
import { assets } from "@/lib/design";

function MarqueeRow({ src, duration = "25s" }: { src: string; duration?: string }) {
  return (
    <div className="overflow-hidden py-3">
      <div
        className="flex w-max gap-8"
        style={{ animation: `marquee ${duration} linear infinite` }}
      >
        {Array.from({ length: 6 }).map((_, i) => (
          <Image
            key={i}
            src={src}
            alt=""
            width={423}
            height={11}
            className="h-[11px] w-auto shrink-0 sm:h-[14px]"
          />
        ))}
        {Array.from({ length: 6 }).map((_, i) => (
          <Image
            key={`dup-${i}`}
            src={src}
            alt=""
            width={423}
            height={11}
            className="h-[11px] w-auto shrink-0 sm:h-[14px]"
          />
        ))}
      </div>
    </div>
  );
}

export function PhotoSection() {
  return (
    <section className="overflow-hidden bg-cream pb-12">
      <div className="mx-auto flex max-w-[600px] flex-col items-center px-4">
        <div className="relative w-full max-w-[207px]">
          <Image
            src={assets.photo.couple}
            alt="Фото пары"
            width={207}
            height={259}
            className="mx-auto h-auto w-full object-cover"
          />
        </div>
      </div>
      <MarqueeRow src={assets.photo.marqueeLove} duration="30s" />
      <div className="mx-auto flex max-w-[600px] flex-col items-center px-4 pt-4">
        <Image
          src={assets.photo.footerText}
          alt="С любовью"
          width={250}
          height={50}
          className="h-auto w-[min(250px,70vw)] opacity-60"
        />
      </div>
      <MarqueeRow src={assets.photo.marqueeAmore} duration="20s" />
    </section>
  );
}
