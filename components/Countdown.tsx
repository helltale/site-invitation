"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { assets } from "@/lib/design";
import { wedding } from "@/lib/wedding";

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function calcTimeLeft(target: Date): TimeLeft {
  const diff = target.getTime() - Date.now();
  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function pad(n: number, min = 2) {
  return String(n).padStart(min, "0");
}

export function Countdown() {
  const targetIso = wedding.date.iso;
  const [time, setTime] = useState<TimeLeft | null>(null);

  useEffect(() => {
    const target = new Date(targetIso);
    setTime(calcTimeLeft(target));
    const id = setInterval(() => setTime(calcTimeLeft(target)), 1000);
    return () => clearInterval(id);
  }, [targetIso]);

  const display = time
    ? `${pad(time.days, time.days >= 100 ? 2 : 2)} : ${pad(time.hours)} : ${pad(time.minutes)} : ${pad(time.seconds)}`
    : "— : — : — : —";

  return (
    <section className="relative overflow-hidden bg-cream px-4 py-16">
      <div className="mx-auto flex max-w-[600px] flex-col items-center">
        <Image
          src={assets.invitation.title}
          alt=""
          width={105}
          height={39}
          className="mb-6 h-auto w-[105px] opacity-90"
        />
        <p
          className="mb-1 text-center font-sans text-xl font-thin tracking-[0.2em] text-brown-dark sm:text-2xl"
          suppressHydrationWarning
        >
          {display}
        </p>
        <div className="mb-10 flex gap-6 text-[10px] text-brown-dark sm:gap-10">
          <span>дней</span>
          <span>часов</span>
          <span>минут</span>
          <span>секунд</span>
        </div>
        <div className="relative w-full max-w-[358px]">
          <Image
            src={assets.countdown.bg}
            alt=""
            width={358}
            height={552}
            className="h-auto w-full rounded-sm object-cover"
          />
          <Image
            src={assets.countdown.wave}
            alt=""
            width={358}
            height={132}
            className="absolute -bottom-4 left-0 h-auto w-full"
          />
        </div>
      </div>
    </section>
  );
}
