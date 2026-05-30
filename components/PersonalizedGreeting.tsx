import type { Guest } from "@/lib/guests";
import { formatGreeting } from "@/lib/guests";

type PersonalizedGreetingProps = {
  guest: Guest;
};

export function PersonalizedGreeting({ guest }: PersonalizedGreetingProps) {
  const greeting = formatGreeting(guest);

  return (
    <section className="bg-cream px-4 pb-4 pt-2">
      <div className="mx-auto max-w-[600px] animate-fade-in text-center">
        <p className="greeting-line">
          <span className="greeting-names">{greeting}</span>,
        </p>
        <p className="greeting-subline mt-3">приглашаем вас на свадьбу</p>
      </div>
    </section>
  );
}
