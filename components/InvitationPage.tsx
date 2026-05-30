import { Hero } from "@/components/Hero";
import { PersonalizedGreeting } from "@/components/PersonalizedGreeting";
import { PhotoSection } from "@/components/PhotoSection";
import { InvitationSection } from "@/components/InvitationSection";
import { ProgramSection } from "@/components/ProgramSection";
import { DressCode } from "@/components/DressCode";
import { RsvpSection } from "@/components/RsvpSection";
import { Countdown } from "@/components/Countdown";
import type { Guest } from "@/lib/guests";

type InvitationPageProps = {
  guest?: Guest;
};

export function InvitationPage({ guest }: InvitationPageProps) {
  return (
    <main className="min-h-screen bg-cream">
      <Hero />
      {guest ? <PersonalizedGreeting guest={guest} /> : null}
      <PhotoSection />
      <InvitationSection />
      <ProgramSection />
      <DressCode />
      <RsvpSection guest={guest} />
      <Countdown />
    </main>
  );
}
