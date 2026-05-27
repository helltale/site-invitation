import Image from "next/image";
import { assets } from "@/lib/design";
import { wedding } from "@/lib/wedding";

export function ProgramSection() {
  const { guestArrival, banquet } = wedding.program;

  return (
    <section className="bg-brown px-4 py-14 text-white">
      <div className="mx-auto flex max-w-[600px] flex-col items-center">
        <Image
          src={assets.program.title}
          alt="Программа дня"
          width={165}
          height={78}
          className="mb-12 h-auto w-[min(165px,45vw)]"
        />
        <div className="flex w-full max-w-[400px] items-start justify-center gap-4 sm:gap-8">
          <div className="flex flex-1 flex-col items-center">
            <Image
              src={assets.program.time14}
              alt={guestArrival.time}
              width={76}
              height={63}
              className="mb-4 h-auto w-[76px]"
            />
            <p className="text-center text-xs uppercase tracking-wide text-white/90">
              {guestArrival.label}
            </p>
          </div>
          <div className="flex flex-col items-center pt-6">
            <span className="mb-2 block h-3 w-3 rounded-full bg-white" />
            <span className="block h-16 w-px bg-white/50" />
            <span className="mt-2 block h-3 w-3 rounded-full bg-white" />
          </div>
          <div className="flex flex-1 flex-col items-center">
            <Image
              src={assets.program.time18}
              alt={banquet.time}
              width={106}
              height={61}
              className="mb-4 h-auto w-[106px]"
            />
            <p className="text-center text-xs uppercase tracking-wide text-white/90">
              {banquet.label}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
