/**
 * Global SVG clip-path for the scalloped (multifoil) Mughal arch.
 * Elements use it with the `arch-clip` style: clipPath: "url(#mehmaan-arch)".
 */

const W = 100;
const H = 140;
const SPRING = 50; // where the straight sides end and the arch begins
const LOBES_PER_SIDE = 4;

function archPath() {
  const pts: Array<[number, number]> = [];
  for (let i = 0; i <= LOBES_PER_SIDE; i++) {
    const t = (i / LOBES_PER_SIDE) * (Math.PI / 2);
    pts.push([50 - 50 * Math.cos(t), SPRING - (SPRING - 2) * Math.sin(t)]);
  }
  const right = pts
    .slice(0, -1)
    .reverse()
    .map(([x, y]) => [100 - x, y] as [number, number]);
  const all = [...pts, ...right];

  let d = `M0 ${H} L0 ${SPRING}`;
  for (let i = 1; i < all.length; i++) {
    const [x0, y0] = all[i - 1];
    const [x1, y1] = all[i];
    const chord = Math.hypot(x1 - x0, y1 - y0);
    const r = (chord * 0.58).toFixed(2);
    d += ` A${r} ${r} 0 0 1 ${x1.toFixed(2)} ${y1.toFixed(2)}`;
  }
  d += ` L${W} ${H} Z`;
  return d;
}

export const ARCH_PATH = archPath();

export function ArchDefs() {
  return (
    <svg width="0" height="0" aria-hidden="true" style={{ position: "absolute" }}>
      <defs>
        <clipPath id="mehmaan-arch" clipPathUnits="objectBoundingBox">
          <path d={ARCH_PATH} transform={`scale(${1 / W} ${1 / H})`} />
        </clipPath>
      </defs>
    </svg>
  );
}

export const archClip = { clipPath: "url(#mehmaan-arch)" } as const;
