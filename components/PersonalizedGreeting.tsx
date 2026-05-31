"use client";

import type { Guest } from "@/lib/guests";
import { formatGreeting } from "@/lib/guests";
import { entranceClass } from "@/hooks/useEntranceAnimation";

type PersonalizedGreetingProps = {
  guest: Guest;
  ready: boolean;
};

export function PersonalizedGreeting({ guest, ready }: PersonalizedGreetingProps) {
  const greeting = formatGreeting(guest);
  const animateClass = entranceClass(ready);

  return (
    <section className="bg-cream px-4 pb-4 pt-2">
      <div
        className={`mx-auto max-w-[600px] text-center ${animateClass}`}
        style={{ animationDelay: "0.85s" }}
      >
        <p className="greeting-line">
          <span className="greeting-names">{greeting}</span>,
        </p>
        <p className="greeting-subline mt-3">приглашаем вас на свадьбу</p>
      </div>
    </section>
  );
}
