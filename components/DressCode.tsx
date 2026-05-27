"use client";

import { useState } from "react";
import Image from "next/image";
import { assets } from "@/lib/design";
import { wedding } from "@/lib/wedding";

export function DressCode() {
  const images = assets.dressCode.images;
  const [index, setIndex] = useState(0);

  const prev = () => setIndex((i) => (i === 0 ? images.length - 1 : i - 1));
  const next = () => setIndex((i) => (i === images.length - 1 ? 0 : i + 1));

  return (
    <section className="bg-cream px-4 py-14">
      <div className="mx-auto flex max-w-[600px] flex-col items-center">
        <Image
          src={assets.dressCode.title}
          alt={wedding.dressCode.title}
          width={144}
          height={44}
          className="mb-8 h-auto w-[min(144px,40vw)]"
        />
        <div className="mb-6 flex gap-2">
          {["#eeece1", "#cbbba1", "#8d6645", "#4f412b"].map((color) => (
            <span
              key={color}
              className="h-7 w-7 rounded-full"
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
        <div className="relative w-full max-w-[166px]">
          <div className="relative aspect-[166/252] overflow-hidden rounded-sm">
            <Image
              src={images[index]}
              alt="Пример образа"
              fill
              className="object-cover"
              sizes="166px"
            />
          </div>
          <button
            type="button"
            onClick={prev}
            className="absolute left-[-36px] top-1/2 -translate-y-1/2 p-2 text-brown-dark"
            aria-label="Предыдущее фото"
          >
            <svg width="30" height="30" viewBox="0 0 94 94" fill="none">
              <path
                d="M39 68L60 47L39 26"
                stroke="currentColor"
                strokeWidth="1"
              />
            </svg>
          </button>
          <button
            type="button"
            onClick={next}
            className="absolute right-[-36px] top-1/2 -translate-y-1/2 rotate-180 p-2 text-brown-dark"
            aria-label="Следующее фото"
          >
            <svg width="30" height="30" viewBox="0 0 94 94" fill="none">
              <path
                d="M39 68L60 47L39 26"
                stroke="currentColor"
                strokeWidth="1"
              />
            </svg>
          </button>
        </div>
        <Image
          src={assets.dressCode.hint}
          alt={wedding.dressCode.hint}
          width={145}
          height={37}
          className="mt-8 h-auto w-[min(145px,40vw)] opacity-60"
        />
      </div>
    </section>
  );
}
