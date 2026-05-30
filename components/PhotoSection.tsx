import Image from "next/image";
import { assets } from "@/lib/design";

function MarqueeRow({
  src,
  duration = "25s",
  width,
  height,
  sizeClass,
  copies = 10,
}: {
  src: string;
  duration?: string;
  width: number;
  height: number;
  sizeClass: string;
  copies?: number;
}) {
  const renderStrip = (keyPrefix: string) =>
    Array.from({ length: copies }, (_, i) => (
      <Image
        key={`${keyPrefix}-${i}`}
        src={src}
        alt=""
        width={width}
        height={height}
        className={`block w-auto shrink-0 ${sizeClass}`}
      />
    ));

  return (
    <div className="overflow-hidden py-3">
      <div
        className="flex w-max will-change-transform"
        style={{ animation: `marquee ${duration} linear infinite` }}
      >
        <div className="flex shrink-0 items-center">{renderStrip("a")}</div>
        <div className="flex shrink-0 items-center" aria-hidden>
          {renderStrip("b")}
        </div>
      </div>
    </div>
  );
}

export function PhotoSection() {
  return (
    <section className="overflow-hidden bg-cream pb-12 pt-4">
      <div className="mx-auto flex max-w-[600px] flex-col items-center px-4">
        <div className="relative w-full max-w-[207px] py-6">
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 z-0 w-screen -translate-x-1/2 -translate-y-1/2"
          >
            <MarqueeRow
              src={assets.photo.marqueeLove}
              duration="50s"
              width={385}
              height={22}
              sizeClass="h-[22px] sm:h-[28px]"
            />
            <MarqueeRow
              src={assets.photo.marqueeAmore}
              duration="45s"
              width={423}
              height={11}
              sizeClass="h-[11px] sm:h-[14px]"
            />
          </div>

          <Image
            src={assets.photo.couple}
            alt="Фото пары"
            width={207}
            height={259}
            className="relative z-10 mx-auto h-auto w-full object-cover"
          />
        </div>

        <div className="mt-2 flex flex-col items-center">
          <Image
            src={assets.photo.loveWord}
            alt="Любовь"
            width={119}
            height={26}
            className="mb-4 h-auto w-[min(119px,32vw)]"
          />
          <Image
            src={assets.photo.footerText}
            alt="Длинною в вечность"
            width={250}
            height={50}
            className="h-auto w-[min(250px,70vw)] opacity-60"
          />
        </div>
      </div>
    </section>
  );
}
