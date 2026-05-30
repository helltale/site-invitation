import Image from "next/image";
import { assets } from "@/lib/design";
import type { Guest } from "@/lib/guests";
import { wedding } from "@/lib/wedding";
import { RsvpForm } from "./RsvpForm";

type RsvpSectionProps = {
  guest?: Guest;
};

export function RsvpSection({ guest }: RsvpSectionProps) {
  return (
    <section id="rsvp" className="relative bg-cream px-4 pb-20 pt-8">
      <div className="mx-auto max-w-[600px]">
        <div className="relative mx-auto mb-8 flex max-w-[320px] flex-col items-center">
          <Image
            src={assets.rsvp.frame}
            alt=""
            width={320}
            height={531}
            className="pointer-events-none absolute inset-0 h-full w-full object-contain opacity-30"
          />
          <div className="relative z-10 flex flex-col items-center py-8">
            <Image
              src={assets.rsvp.header}
              alt="Анкета"
              width={115}
              height={44}
              className="mb-6 h-auto w-[115px]"
            />
            <Image
              src={assets.rsvp.dateLine}
              alt={wedding.date.displayLong}
              width={169}
              height={42}
              className="mb-4 h-auto w-[169px]"
            />
            <p className="text-center text-xs text-brown-dark/70">
              Пожалуйста, заполните до {wedding.date.rsvpDeadline}
            </p>
          </div>
        </div>
        <RsvpForm guest={guest} />
      </div>
    </section>
  );
}
