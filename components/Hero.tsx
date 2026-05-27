import Image from "next/image";
import { assets } from "@/lib/design";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-cream px-4 pb-16 pt-10 sm:pt-14">
      <div className="mx-auto flex max-w-[600px] flex-col items-center animate-fade-in">
        <Image
          src={assets.hero.ornamentTop}
          alt=""
          width={117}
          height={118}
          className="mb-6 h-auto w-[min(117px,28vw)]"
          priority
        />
        <div className="relative flex flex-col items-center">
          <Image
            src={assets.hero.names}
            alt="Имена"
            width={202}
            height={90}
            className="h-auto w-[min(202px,55vw)]"
            priority
          />
          <Image
            src={assets.hero.ampersand}
            alt=""
            width={64}
            height={11}
            className="my-3 h-auto w-[min(64px,18vw)]"
          />
        </div>
        <div className="mt-10 flex flex-col items-center gap-1 text-brown-dark opacity-80">
          <span className="text-[10px] tracking-widest">scroll</span>
          <svg
            width="24"
            height="8"
            viewBox="0 0 23.965 8.14"
            fill="none"
            className="animate-bounce"
            aria-hidden
          >
            <path
              d="M4.796 7.403V7.964H0V7.304L3.047 4.092C3.751 3.351 4.103 2.688 4.103 2.101c0-.469-.154-.847-.441-1.133-.293-.294-.675-.441-1.153-.441-.41 0-.766.125-1.067.374-.3.25-.502.583-.605 1.001l-.616-.132c.125-.528.393-.953.803-1.276.419-.33.914-.495 1.486-.495.638 0 1.17.187 1.595.561.433.367.649.87.649 1.508 0 .455-.11.865-.33 1.232-.22.359-.557.777-1.012 1.254L.671 7.403h4.125z"
              fill="currentColor"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
