import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { HandHeart, Languages, Mic, Wallet } from "lucide-react";

import blockprint from "@/assets/exp-blockprint.jpg";
import { archClip } from "@/components/site/ArchDefs";
import { MandalaCorner } from "@/components/site/MandalaCorner";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/host")({
  head: () => ({
    meta: [
      { title: "Become a host — Mehmaan" },
      {
        name: "description",
        content: "Share your family's food, craft or traditions with travellers, in your own voice and language.",
      },
      { property: "og:title", content: "Open your home — Mehmaan" },
      {
        property: "og:description",
        content: "Share your family's food, craft or traditions with travellers, in your own voice.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HostPage,
});

const promises = [
  {
    icon: HandHeart,
    title: "Share what you already do",
    body: "Your everyday cooking, craft or morning. Nothing staged, and you are never asked to perform rituals for guests.",
  },
  {
    icon: Mic,
    title: "Speak, don't type",
    body: "Describe your experience in a voice note. We turn it into a clear listing you approve.",
  },
  {
    icon: Languages,
    title: "In your own language",
    body: "Talk to guests in Hindi, Tamil, Gujarati or your language. The guest's words reach you slowly and clearly.",
  },
  {
    icon: Wallet,
    title: "You set the price",
    body: "One fixed price per guest. Guests see it in full before they book.",
  },
];

function HostPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-maroon-glow text-parchment-light">
        <MandalaCorner className="absolute left-0 top-0 h-40 w-40" />
        <MandalaCorner className="absolute bottom-0 right-0 h-40 w-40 -scale-100" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-6 py-20 md:grid-cols-2">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }}>
            <p className="eyebrow text-gold">Mezbaan · मेज़बान · Host</p>
            <h1 className="mt-4 text-5xl text-gold-bright sm:text-6xl">Your home is already a welcome</h1>
            <p className="mt-5 max-w-lg text-lg text-parchment-light/85">
              Millions of families keep beautiful traditions alive. Mehmaan helps you share yours with travellers —
              on your terms, in your voice.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.1 }}
            className="mx-auto w-full max-w-xs"
          >
            <div className="bg-gold-sheen p-[8px] shadow-lift" style={archClip}>
              <div className="overflow-hidden" style={archClip}>
                <img
                  src={blockprint}
                  alt="An artisan presses a carved wooden block onto cotton"
                  width={896}
                  height={1120}
                  className="aspect-[4/5] w-full object-cover"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      <div className="block-border" aria-hidden="true" />

      <section className="mx-auto max-w-6xl px-6 py-24">
        <div className="text-center">
          <p className="eyebrow text-blockred">What hosting means</p>
          <h2 className="mt-3 text-4xl text-maroon sm:text-5xl">Four promises to every host</h2>
        </div>
        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {promises.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="flex gap-5 rounded-2xl bg-card p-7 shadow-card ring-1 ring-border"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-maroon text-gold-bright">
                <p.icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <h3 className="text-2xl text-maroon">{p.title}</h3>
                <p className="mt-2 text-ink-soft">{p.body}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 rounded-3xl border border-dashed border-gold bg-parchment-light/70 p-10 text-center">
          <h2 className="text-3xl text-maroon">Host sign-up opens soon</h2>
          <p className="mx-auto mt-3 max-w-lg text-ink-soft">
            We're welcoming our first families now. Meanwhile, see how a listing looks to a guest.
          </p>
          <Button asChild variant="maroon" size="xl" className="mt-7">
            <Link to="/experiences">See sample listings</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
