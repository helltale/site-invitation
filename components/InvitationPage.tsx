import { InvitationIntro } from "@/components/InvitationIntro";
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
      <InvitationIntro guest={guest} />
      <PhotoSection />
      <InvitationSection />
      <ProgramSection />
      <DressCode />
      <RsvpSection guest={guest} />
      <Countdown />
    </main>
  );
}
