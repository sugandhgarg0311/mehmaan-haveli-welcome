import { motion } from "motion/react";
import { Clock, MapPin } from "lucide-react";

import { archClip } from "@/components/site/ArchDefs";
import { formatInr, type Experience } from "@/data/experiences";

export function ExperienceCard({ exp, index = 0 }: { exp: Experience; index?: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: (index % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
      className="group flex flex-col rounded-2xl bg-card p-3 shadow-card ring-1 ring-border"
    >
      <div className="relative">
        <div className="bg-gold-sheen p-[5px]" style={archClip}>
          <div className="overflow-hidden" style={archClip}>
            <img
              src={exp.image}
              alt={`${exp.host} — ${exp.title}`}
              width={896}
              height={1120}
              loading="lazy"
              className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
        </div>
        <span className="absolute bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-maroon-deep/85 px-3 py-1 text-[0.7rem] font-semibold tracking-wide text-gold-bright backdrop-blur-sm">
          Sample listing · role-play host
        </span>
      </div>

      <div className="flex flex-1 flex-col px-2 pb-2 pt-4">
        <p className="eyebrow text-blockred">
          {exp.hindi} · {exp.category}
        </p>
        <h3 className="mt-1 text-2xl text-maroon">{exp.title}</h3>
        <p className="mt-1 text-sm font-semibold text-ink">with {exp.host}</p>
        <p className="mt-2 text-sm leading-relaxed text-ink-soft">{exp.expect}</p>

        <div className="mt-auto flex items-end justify-between gap-3 border-t border-dashed border-border pt-4">
          <div className="space-y-1 text-xs text-ink-soft">
            <p className="flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 text-blockred" aria-hidden="true" />
              {exp.city}, {exp.state}
            </p>
            <p className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-blockred" aria-hidden="true" />
              {exp.durationHours} hours
            </p>
          </div>
          <div className="text-right">
            <p className="font-display text-2xl leading-none text-maroon">{formatInr(exp.priceInr)}</p>
            <p className="mt-1 text-[0.7rem] text-ink-soft">full price, per guest</p>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
