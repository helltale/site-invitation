import Image from "next/image";
import { assets } from "@/lib/design";
import { wedding } from "@/lib/wedding";

export function InvitationSection() {
  return (
    <section className="bg-cream px-4 py-12">
      <div className="mx-auto flex max-w-[600px] flex-col items-center text-center">
        <Image
          src={assets.invitation.title}
          alt="Приглашение"
          width={122}
          height={116}
          className="mb-8 h-auto w-[min(122px,32vw)]"
        />
        <div className="mb-6 h-[59px] w-[195px] max-w-full">
          <Image
            src={assets.invitation.date}
            alt={wedding.date.displayLong}
            width={195}
            height={59}
            className="mx-auto h-auto w-full"
          />
        </div>
        <p className="mb-2 max-w-[280px] text-sm leading-relaxed text-brown-dark/80">
          {wedding.venue.name}
          {wedding.venue.address ? (
            <>
              <br />
              {wedding.venue.address}
            </>
          ) : null}
        </p>
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
