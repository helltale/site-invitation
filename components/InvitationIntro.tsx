"use client";

import { Hero } from "@/components/Hero";
import { PersonalizedGreeting } from "@/components/PersonalizedGreeting";
import { useEntranceAnimation } from "@/hooks/useEntranceAnimation";
import type { Guest } from "@/lib/guests";

type InvitationIntroProps = {
  guest?: Guest;
};

export function InvitationIntro({ guest }: InvitationIntroProps) {
  const ready = useEntranceAnimation();

  return (
    <>
      <Hero ready={ready} />
      {guest ? <PersonalizedGreeting guest={guest} ready={ready} /> : null}
    </>
  );
}
