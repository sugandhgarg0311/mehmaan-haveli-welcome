import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Volume2, VolumeX } from "lucide-react";

import doorImage from "@/assets/haveli-door.jpg";
import doorSound from "@/assets/door-open.mp3.asset.json";
import { lockScroll } from "@/lib/smooth-scroll";
import { Button } from "@/components/ui/button";

// Pixel geometry of the door leaves inside haveli-door.jpg (1920 × 1088).
const IMG_W = 1920;
const IMG_H = 1088;
const DOOR = { left: 595, seam: 958, right: 1330, top: 330, bottom: 998 };
const DOOR_H = DOOR.bottom - DOOR.top;

const pct = (v: number, total: number) => `${(v / total) * 100}%`;

function leafStyle(x0: number, w: number): React.CSSProperties {
  return {
    backgroundImage: `url(${doorImage})`,
    backgroundSize: `${(IMG_W / w) * 100}% ${(IMG_H / DOOR_H) * 100}%`,
    backgroundPosition: `${(x0 / (IMG_W - w)) * 100}% ${(DOOR.top / (IMG_H - DOOR_H)) * 100}%`,
  };
}

// The frame keeps everything except the doorway, so the real site shows through when the doors open.
const hole = {
  l: pct(DOOR.left + 2, IMG_W),
  r: pct(DOOR.right - 2, IMG_W),
  t: pct(DOOR.top + 2, IMG_H),
  b: pct(DOOR.bottom - 1, IMG_H),
};
const frameClip = `polygon(evenodd, 0 0, 100% 0, 100% 100%, 0 100%, 0 0, ${hole.l} ${hole.t}, ${hole.r} ${hole.t}, ${hole.r} ${hole.b}, ${hole.l} ${hole.b}, ${hole.l} ${hole.t})`;

export function DoorEntrance({
  onEntered,
  onOpening,
}: {
  onEntered: () => void;
  /** Fires as the doors start to swing, so the page behind can come alive. */
  onOpening?: () => void;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const shadeL = useRef<HTMLDivElement>(null);
  const shadeR = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const uiRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [opening, setOpening] = useState(false);
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    lockScroll(true);
    const audio = new Audio(doorSound.url);
    audio.preload = "auto";
    audio.volume = 0.85;
    audioRef.current = audio;
    return () => {
      audio.pause();
      lockScroll(false);
    };
  }, []);

  const finish = () => {
    lockScroll(false);
    onEntered();
  };

  const open = () => {
    if (opening) return;
    setOpening(true);

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!muted) {
      const audio = audioRef.current;
      if (audio) {
        audio.currentTime = 0;
        void audio.play().catch(() => undefined);
      }
    }

    if (reduce) {
      gsap.to(rootRef.current, { opacity: 0, duration: 0.6, onComplete: finish });
      return;
    }

    const tl = gsap.timeline({ onComplete: finish });
    tl.call(() => onOpening?.(), [], 1.1);
    tl.to(uiRef.current, { opacity: 0, y: 16, duration: 0.45, ease: "power2.out" }, 0)
      // a slow step towards the door while the latch lifts
      .to(stageRef.current, { scale: 1.08, duration: 1.1, ease: "power2.inOut" }, 0)
      .to(leftRef.current, { rotateY: 86, duration: 2.8, ease: "power2.inOut" }, 0.95)
      .to(rightRef.current, { rotateY: -86, duration: 2.8, ease: "power2.inOut" }, 1.0)
      .to([shadeL.current, shadeR.current], { opacity: 0.75, duration: 2.6 }, 1.0)
      .to(glowRef.current, { opacity: 1, duration: 1.4, ease: "power1.out" }, 1.2)
      // walk through the doorway
      .to(stageRef.current, { scale: 5.2, duration: 1.5, ease: "power3.in" }, 2.9)
      .to(glowRef.current, { opacity: 0, duration: 0.8 }, 3.6)
      .to(rootRef.current, { opacity: 0, duration: 0.55, ease: "power1.out" }, 3.85);
  };

  const skip = () => {
    audioRef.current?.pause();
    gsap.to(rootRef.current, { opacity: 0, duration: 0.4, onComplete: finish });
  };

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[100] overflow-hidden"
      role="dialog"
      aria-modal="true"
      aria-label="Welcome door. Open the door to enter Mehmaan."
    >
      {/* Stage keeps the photo's aspect ratio and covers the screen. */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[max(100vh,calc(100vw*1088/1920))] w-[max(100vw,calc(100vh*1920/1088))]">
        <div
          ref={stageRef}
          className="absolute inset-0"
          style={{
            transformOrigin: `${(((DOOR.left + DOOR.right) / 2) / IMG_W) * 100}% ${(((DOOR.top + DOOR.bottom) / 2) / IMG_H) * 100}%`,
          }}
        >
          <img
            src={doorImage}
            alt="Carved golden double door with brass rosettes inside a pink sandstone arch with a marigold toran"
            width={IMG_W}
            height={IMG_H}
            className="absolute inset-0 h-full w-full select-none"
            style={{ clipPath: frameClip }}
            draggable={false}
          />

          {/* Doorway */}
          <div
            className="absolute"
            style={{
              left: pct(DOOR.left, IMG_W),
              top: pct(DOOR.top, IMG_H),
              width: pct(DOOR.right - DOOR.left, IMG_W),
              height: pct(DOOR_H, IMG_H),
              perspective: "1400px",
            }}
          >
            <div
              ref={glowRef}
              className="absolute inset-0 opacity-0"
              style={{
                background:
                  "radial-gradient(70% 60% at 50% 55%, oklch(0.97 0.06 88 / 0.95), oklch(0.85 0.12 80 / 0.55) 45%, transparent 80%)",
              }}
            />
            <button
              type="button"
              onClick={open}
              aria-label="Open the door"
              className="absolute inset-0 flex cursor-pointer [transform-style:preserve-3d]"
              tabIndex={-1}
            >
              <div
                ref={leftRef}
                className="relative h-full [backface-visibility:hidden] [transform-origin:left_center]"
                style={{ width: pct(DOOR.seam - DOOR.left, DOOR.right - DOOR.left), ...leafStyle(DOOR.left, DOOR.seam - DOOR.left) }}
              >
                <div
                  ref={shadeL}
                  className="absolute inset-0 opacity-0"
                  style={{ background: "linear-gradient(90deg, oklch(0.15 0.03 40 / 0.2), oklch(0.12 0.03 40 / 0.85))" }}
                />
              </div>
              <div
                ref={rightRef}
                className="relative h-full [backface-visibility:hidden] [transform-origin:right_center]"
                style={{ width: pct(DOOR.right - DOOR.seam, DOOR.right - DOOR.left), ...leafStyle(DOOR.seam, DOOR.right - DOOR.seam) }}
              >
                <div
                  ref={shadeR}
                  className="absolute inset-0 opacity-0"
                  style={{ background: "linear-gradient(270deg, oklch(0.15 0.03 40 / 0.2), oklch(0.12 0.03 40 / 0.85))" }}
                />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Welcome UI */}
      <div ref={uiRef} className="pointer-events-none absolute inset-0 flex flex-col justify-between">
        <div className="bg-gradient-to-b from-maroon-deep/80 via-maroon-deep/30 to-transparent px-6 pb-16 pt-6 text-center">
          <p className="eyebrow text-gold-bright/90">अतिथि देवो भव · The guest is God</p>
          <p className="mt-2 font-display text-4xl text-parchment-light sm:text-5xl">Mehmaan</p>
        </div>

        <div className="flex flex-col items-center gap-3 bg-gradient-to-t from-maroon-deep/85 via-maroon-deep/40 to-transparent px-6 pb-10 pt-24">
          <Button
            variant="gold"
            size="xl"
            onClick={open}
            autoFocus
            className="pointer-events-auto animate-knock px-9 text-lg"
          >
            <span className="font-display text-xl font-normal">पधारिए</span>
            <span aria-hidden="true">·</span>
            Open the door
          </Button>
          <p className="text-sm text-parchment-light/80">Or tap the door. Sound plays when it opens.</p>
        </div>
      </div>

      <div className="absolute right-4 top-4 flex items-center gap-2">
        <button
          type="button"
          onClick={() => setMuted((m) => !m)}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/50 bg-maroon-deep/60 text-gold-bright backdrop-blur-sm transition-colors hover:bg-maroon-deep/80"
          aria-label={muted ? "Turn door sound on" : "Turn door sound off"}
          aria-pressed={muted}
        >
          {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
        </button>
        <button
          type="button"
          onClick={skip}
          className="h-10 rounded-full border border-gold/50 bg-maroon-deep/60 px-4 text-sm font-semibold text-gold-bright backdrop-blur-sm transition-colors hover:bg-maroon-deep/80"
        >
          Skip
        </button>
      </div>
    </div>
  );
}
