import { cn } from "@/lib/utils";

const RINGS = [
  { r: 18, n: 5, len: 16, w: 6 },
  { r: 44, n: 8, len: 20, w: 7 },
  { r: 74, n: 11, len: 22, w: 7 },
  { r: 106, n: 15, len: 22, w: 6 },
];

function petal(len: number, w: number) {
  return `M0 0 Q${len / 2} ${-w} ${len} 0 Q${len / 2} ${w} 0 0 Z`;
}

/** Quarter mandala in gold line-work, drawn for the top-left corner. Flip with scale classes. */
export function MandalaCorner({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 150 150"
      aria-hidden="true"
      className={cn("pointer-events-none text-gold", className)}
      fill="none"
      stroke="currentColor"
    >
      {[14, 40, 70, 102, 132, 140].map((r) => (
        <path
          key={r}
          d={`M${r} 0 A${r} ${r} 0 0 1 0 ${r}`}
          strokeWidth={r > 130 ? 0.6 : 0.9}
          opacity={0.9}
        />
      ))}
      {RINGS.map((ring) =>
        Array.from({ length: ring.n }).map((_, i) => {
          const deg = ((i + 0.5) / ring.n) * 90;
          return (
            <path
              key={`${ring.r}-${i}`}
              d={petal(ring.len, ring.w)}
              transform={`rotate(${deg.toFixed(2)}) translate(${ring.r + 2} 0)`}
              strokeWidth={0.9}
              fill="currentColor"
              fillOpacity={0.14}
            />
          );
        }),
      )}
      {Array.from({ length: 22 }).map((_, i) => {
        const a = ((i + 0.5) / 22) * (Math.PI / 2);
        return (
          <circle
            key={i}
            cx={(136 * Math.cos(a)).toFixed(2)}
            cy={(136 * Math.sin(a)).toFixed(2)}
            r={1.6}
            fill="currentColor"
            stroke="none"
          />
        );
      })}
    </svg>
  );
}
