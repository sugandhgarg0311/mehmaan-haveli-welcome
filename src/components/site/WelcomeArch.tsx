import { useEffect, useRef } from "react";
import { gsap } from "gsap";

import archImage from "@/assets/elephant-arch.webp";
import coupleImage from "@/assets/welcome-couple.webp";

// The arch image is 1024 × 1392; its open doorway sits roughly inside this box (percent of the image).
const OPENING = { left: "22%", right: "22%", top: "19%", bottom: "4%" };
const PETALS = 16;
const petalTones = ["bg-turmeric", "bg-blockred", "bg-gold-bright", "bg-turmeric"];

/**
 * Hero welcome: the elephant arch slides together from both sides, then a couple rises
 * into the doorway with folded hands while marigold petals fall.
 */
export function WelcomeArch({ play, delay = 0 }: { play: boolean; delay?: number }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLImageElement>(null);
  const rightRef = useRef<HTMLImageElement>(null);
  const lightRef = useRef<HTMLDivElement>(null);
  const coupleRef = useRef<HTMLDivElement>(null);
  const coupleImgRef = useRef<HTMLImageElement>(null);
  const greetRef = useRef<HTMLDivElement>(null);
  const petalsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!play) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const parts = [leftRef.current, rightRef.current, lightRef.current, coupleRef.current, greetRef.current];

    if (reduce) {
      gsap.set(parts, { opacity: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay });
      tl.fromTo(leftRef.current, { xPercent: -28, opacity: 0 }, { xPercent: 0, opacity: 1, duration: 1.5, ease: "power3.out" }, 0)
        .fromTo(rightRef.current, { xPercent: 28, opacity: 0 }, { xPercent: 0, opacity: 1, duration: 1.5, ease: "power3.out" }, 0)
        .fromTo(lightRef.current, { opacity: 0 }, { opacity: 1, duration: 1.2, ease: "power1.out" }, 0.7)
        .fromTo(
          coupleRef.current,
          { yPercent: 55, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 1.3, ease: "back.out(1.3)" },
          1.1,
        )
        .fromTo(
          greetRef.current,
          { scale: 0.6, opacity: 0, y: 12 },
          { scale: 1, opacity: 1, y: 0, duration: 0.8, ease: "back.out(2)" },
          2.0,
        )
        // a gentle namaste bow, repeating
        .add(() => {
          gsap
            .timeline({ repeat: -1, repeatDelay: 2.6 })
            .to(coupleImgRef.current, { y: 7, scaleY: 0.985, duration: 0.55, ease: "sine.inOut" })
            .to(coupleImgRef.current, { y: 0, scaleY: 1, duration: 0.7, ease: "sine.out" });
          gsap.to(greetRef.current, { y: -5, duration: 2.2, ease: "sine.inOut", yoyo: true, repeat: -1 });
        }, 2.4);

      // marigold petals drifting down through the doorway
      gsap.utils.toArray<HTMLElement>("[data-petal]", petalsRef.current).forEach((el) => {
        const fall = () => {
          gsap.fromTo(
            el,
            { yPercent: -200, top: "-6%", left: `${gsap.utils.random(4, 92)}%`, rotate: gsap.utils.random(0, 360), opacity: 0 },
            {
              top: "104%",
              opacity: 1,
              rotate: `+=${gsap.utils.random(180, 540)}`,
              x: gsap.utils.random(-30, 30),
              duration: gsap.utils.random(5, 9),
              ease: "none",
              onComplete: fall,
            },
          );
        };
        gsap.delayedCall(delay + 2 + gsap.utils.random(0, 6), fall);
      });

      // soft parallax: the couple leans towards the pointer, the frame away from it
      const root = rootRef.current;
      if (!root || window.matchMedia("(pointer: coarse)").matches) return;
      const coupleX = gsap.quickTo(coupleImgRef.current, "x", { duration: 0.8, ease: "power3.out" });
      const frameX = gsap.quickTo([leftRef.current, rightRef.current], "x", { duration: 0.8, ease: "power3.out" });
      const onMove = (e: PointerEvent) => {
        const r = root.getBoundingClientRect();
        const dx = (e.clientX - r.left) / r.width - 0.5;
        coupleX(dx * 14);
        frameX(dx * -6);
      };
      const onLeave = () => {
        coupleX(0);
        frameX(0);
      };
      root.addEventListener("pointermove", onMove);
      root.addEventListener("pointerleave", onLeave);
      return () => {
        root.removeEventListener("pointermove", onMove);
        root.removeEventListener("pointerleave", onLeave);
      };
    }, rootRef);

    return () => ctx.revert();
  }, [play, delay]);

  return (
    <div ref={rootRef} className="relative mx-auto aspect-[1024/1392] w-full">
      {/* warm courtyard light inside the doorway */}
      <div ref={lightRef} className="absolute overflow-hidden opacity-0" style={OPENING}>
        <div className="absolute inset-0 bg-gradient-to-b from-parchment-light via-parchment to-gold-bright/70" />
        <div className="animate-diya absolute left-1/2 top-[14%] h-[38%] w-[90%] -translate-x-1/2 rounded-full bg-gold-bright/60 blur-2xl" />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-turmeric/40 to-transparent" />
      </div>

      {/* the welcoming couple, standing in the doorway */}
      <div
        ref={coupleRef}
        className="absolute opacity-0"
        style={{ left: "27%", width: "46%", bottom: "15%" }}
      >
        <img
          ref={coupleImgRef}
          src={coupleImage}
          alt="Illustrated Rajasthani couple greeting you with folded hands"
          width={910}
          height={822}
          className="w-full origin-bottom select-none"
          style={{
            maskImage: "linear-gradient(to bottom, black 70%, transparent 98%)",
            WebkitMaskImage: "linear-gradient(to bottom, black 70%, transparent 98%)",
          }}
          draggable={false}
        />
      </div>

      {/* falling petals */}
      <div ref={petalsRef} className="pointer-events-none absolute overflow-hidden" style={OPENING} aria-hidden="true">
        {Array.from({ length: PETALS }, (_, i) => (
          <span
            key={i}
            data-petal
            className={`absolute h-2.5 w-2 rounded-[60%_0_60%_0] opacity-0 ${petalTones[i % petalTones.length]}`}
          />
        ))}
      </div>

      {/* greeting */}
      <div
        ref={greetRef}
        className="absolute left-1/2 top-[35%] -translate-x-1/2 whitespace-nowrap opacity-0"
      >
        <div className="rounded-full border border-gold bg-maroon px-4 py-1.5 text-center shadow-lift">
          <p className="font-display text-lg leading-tight text-gold-bright sm:text-xl">पधारो म्हारे देस</p>
          <p className="text-[0.62rem] uppercase tracking-[0.2em] text-parchment-light/80">Welcome to our home</p>
        </div>
      </div>

      {/* the arch, in two halves that slide together */}
      <img
        ref={leftRef}
        src={archImage}
        alt="Painted arch with two decorated elephants under royal umbrellas and a pair of peacocks"
        width={1024}
        height={1392}
        className="pointer-events-none absolute inset-0 h-full w-full select-none opacity-0 drop-shadow-2xl"
        style={{ clipPath: "inset(0 50% 0 0)" }}
        draggable={false}
      />
      <img
        ref={rightRef}
        src={archImage}
        alt=""
        aria-hidden="true"
        width={1024}
        height={1392}
        className="pointer-events-none absolute inset-0 h-full w-full select-none opacity-0"
        style={{ clipPath: "inset(0 0 0 50%)" }}
        draggable={false}
      />
    </div>
  );
}
