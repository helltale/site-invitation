import { Hero } from "@/components/Hero";
import { PhotoSection } from "@/components/PhotoSection";
import { InvitationSection } from "@/components/InvitationSection";
import { ProgramSection } from "@/components/ProgramSection";
import { DressCode } from "@/components/DressCode";
import { RsvpSection } from "@/components/RsvpSection";
import { Countdown } from "@/components/Countdown";

export default function Home() {
  return (
    <main className="min-h-screen bg-cream">
      <Hero />
      <PhotoSection />
      <InvitationSection />
      <ProgramSection />
      <DressCode />
      <RsvpSection />
      <Countdown />
    </main>
  );
}
