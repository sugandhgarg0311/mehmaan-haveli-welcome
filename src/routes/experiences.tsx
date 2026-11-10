import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";

import { ExperienceCard } from "@/components/site/ExperienceCard";
import { MandalaCorner } from "@/components/site/MandalaCorner";
import { experiences, type ExperienceCategory } from "@/data/experiences";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/experiences")({
  head: () => ({
    meta: [
      { title: "Experiences — Mehmaan" },
      {
        name: "description",
        content: "Cook, print, shape clay and share mornings with Indian families. Fixed prices, clear refund rules.",
      },
      { property: "og:title", content: "Experiences in Indian homes — Mehmaan" },
      {
        property: "og:description",
        content: "Cook, print, shape clay and share mornings with Indian families.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ExperiencesPage,
});

const filters: Array<{ value: "All" | ExperienceCategory; label: string }> = [
  { value: "All", label: "All · सब" },
  { value: "Food", label: "Food · खाना" },
  { value: "Craft", label: "Craft · कला" },
  { value: "Mornings", label: "Mornings · सुबह" },
];

function ExperiencesPage() {
  const [filter, setFilter] = useState<"All" | ExperienceCategory>("All");
  const shown = filter === "All" ? experiences : experiences.filter((e) => e.category === filter);

  return (
    <>
      <section className="relative overflow-hidden bg-maroon-glow text-parchment-light">
        <MandalaCorner className="absolute left-0 top-0 h-36 w-36" />
        <MandalaCorner className="absolute right-0 top-0 h-36 w-36 -scale-x-100" />
        <div className="mx-auto max-w-4xl px-6 py-20 text-center">
          <p className="eyebrow text-gold">Anubhav · अनुभव</p>
          <h1 className="mt-4 text-5xl text-gold-bright sm:text-6xl">Choose a home to visit</h1>
          <p className="mx-auto mt-4 max-w-xl text-parchment-light/85">
            Every price is the full price, per guest. Refund rules and what to expect are on every listing.
          </p>
        </div>
      </section>
      <div className="block-border" aria-hidden="true" />

      <section className="mx-auto max-w-7xl px-6 py-14 sm:px-8">
        <div className="flex flex-wrap justify-center gap-3" role="group" aria-label="Filter experiences">
          {filters.map((f) => (
            <button
              key={f.value}
              type="button"
              onClick={() => setFilter(f.value)}
              aria-pressed={filter === f.value}
              className={cn(
                "rounded-full border px-5 py-2 text-sm font-semibold transition-colors",
                filter === f.value
                  ? "border-maroon bg-maroon text-parchment-light"
                  : "border-border bg-card text-ink-soft hover:border-maroon/40 hover:text-maroon",
              )}
            >
              {f.label}
            </button>
          ))}
        </div>

        <motion.div layout className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((exp, i) => (
            <ExperienceCard key={exp.slug} exp={exp} index={i} />
          ))}
        </motion.div>

        <p className="mt-12 text-center text-sm text-ink-soft">
          These are sample listings with role-played hosts while real families join.
        </p>
      </section>
    </>
  );
}
