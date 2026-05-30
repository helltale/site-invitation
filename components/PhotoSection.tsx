import Image from "next/image";
import { assets } from "@/lib/design";
import { wedding } from "@/lib/wedding";

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
  const [day, month] = wedding.date.heroParts;

  return (
    <section className="bg-cream pb-16 pt-4">
      <div className="mx-auto flex max-w-[600px] flex-col items-center px-4">
        <div className="relative w-full max-w-[207px] overflow-x-clip py-6">
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

        <Image
          src={assets.photo.introText}
          alt=""
          width={214}
          height={75}
          className="photo-intro-text"
        />

        <div className="photo-love-block">
          <Image
            src={assets.photo.loveWord}
            alt="Любовь"
            width={119}
            height={26}
            className="photo-love-word"
          />
          <Image
            src={assets.photo.footerText}
            alt="Длиною в вечность"
            width={250}
            height={50}
            className="photo-love-footer"
          />
        </div>

        <div className="photo-invitation-block">
          <div className="photo-event-date">
            <span className="hero-date-side photo-event-date-day">
              <span className="photo-event-date-part">{day}</span>
              <span className="photo-event-date-dot" aria-hidden="true">
                .
              </span>
              <span className="photo-event-date-part">{month}</span>
            </span>
            <span className="hero-date-year photo-event-date-year">
              {wedding.date.heroYear}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
