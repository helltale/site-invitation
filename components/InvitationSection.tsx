import Image from "next/image";
import { assets } from "@/lib/design";
import { wedding } from "@/lib/wedding";

export function InvitationSection() {
  return (
    <section className="bg-cream px-4 py-12">
      <div className="mx-auto flex max-w-[600px] flex-col items-center text-center">
        <p className="invitation-venue-name">{wedding.venue.name}</p>
        <a
          href={wedding.venue.mapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group mt-6 inline-flex flex-col items-center"
        >
          <span className="mb-3 inline-block rounded-full bg-taupe px-10 py-2 transition-opacity group-hover:opacity-90">
            <Image
              src={assets.invitation.mapLabel}
              alt="Посмотреть на карте"
              width={65}
              height={8}
              className="h-auto w-[65px]"
            />
          </span>
        </a>
      </div>
    </section>
  );
}
