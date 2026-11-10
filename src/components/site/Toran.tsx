import { cn } from "@/lib/utils";

/** A marigold-and-mango-leaf toran: the garland hung over an Indian doorway to welcome guests. */

const SWAG_W = 120;
const SWAG_DIP = 34;
const FLOWERS = 11;

function point(t: number): [number, number] {
  // quadratic curve (0,4) → (60, 4 + 2·dip) → (120,4)
  const x = 2 * (1 - t) * t * (SWAG_W / 2) + t * t * SWAG_W;
  const y = (1 - t) * (1 - t) * 4 + 2 * (1 - t) * t * (4 + SWAG_DIP) + t * t * 4;
  return [x, y];
}

const flowers = Array.from({ length: FLOWERS }, (_, i) => point(i / (FLOWERS - 1)));

function Swag({ index }: { index: number }) {
  return (
    <svg
      viewBox={`0 0 ${SWAG_W} 64`}
      className="animate-toran h-full w-auto shrink-0 overflow-visible"
      style={{ animationDelay: `${(index % 5) * -0.7}s` }}
      aria-hidden="true"
    >
      {/* mango leaves at the knot */}
      <path d="M0 4 C-5 14 -3 24 0 30 C3 24 5 14 0 4 Z" className="fill-leaf" />
      <path d="M0 4 L0 28" className="stroke-parchment-light/40" strokeWidth="0.6" />
      {flowers.map(([x, y], i) => (
        <g key={i} transform={`translate(${x} ${y})`}>
          <circle r="5.2" className={i % 2 ? "fill-turmeric" : "fill-blockred/90"} />
          <circle r="3.2" className={i % 2 ? "fill-gold-bright" : "fill-turmeric"} />
          <circle r="1.1" className="fill-maroon-deep/60" />
        </g>
      ))}
      {/* hanging strand */}
      {[0, 1, 2].map((k) => (
        <circle key={k} cx={SWAG_W / 2} cy={4 + SWAG_DIP + 10 + k * 8} r={3.6 - k * 0.6} className="fill-turmeric" />
      ))}
    </svg>
  );
}

export function Toran({ className, count = 14 }: { className?: string; count?: number }) {
  return (
    <div className={cn("pointer-events-none flex justify-center overflow-hidden", className)}>
      {Array.from({ length: count }, (_, i) => (
        <Swag key={i} index={i} />
      ))}
    </div>
  );
}
