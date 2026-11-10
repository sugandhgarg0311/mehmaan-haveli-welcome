import { useEffect, useRef, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BadgeIndianRupee, MapPinned, RotateCcw, ShieldCheck, Utensils } from "lucide-react";

import pichwai from "@/assets/pichwai-gopis.jpg.asset.json";
import { DoorEntrance } from "@/components/door/DoorEntrance";
import { MandalaCorner } from "@/components/site/MandalaCorner";
import { ExperienceCard } from "@/components/site/ExperienceCard";
import { archClip } from "@/components/site/ArchDefs";
import { Button } from "@/components/ui/button";
import { experiences } from "@/data/experiences";

const ENTERED_KEY = "mehmaan:entered";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Mehmaan — Aaiye, padhariye. Be a guest in an Indian home" },
      {
        name: "description",
        content:
          "Atithi Devo Bhava. Cook, craft and share mornings with Indian families who open their homes to travellers.",
      },
      { property: "og:title", content: "Mehmaan — Aaiye, padhariye" },
      {
        property: "og:description",
        content: "Cook, craft and share mornings with Indian families who open their homes to travellers.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const journey = [
  { home: "Met at the door", site: "The door opens: “आइए, पधारिए”" },
  { home: "Addressed with respect — “ji”, “aap”", site: "Meena ji, not “user 2041”. You are our guest." },
  {
    home: "Water offered before anything is asked",
    site: "What to expect, full price and refund rules — answered before you book",
  },
  { home: "The guest's comfort comes first", site: "Tell your host about diet and allergies" },
  { home: "The guest eats first", site: "Your words go first; your host hears them slowly and clearly" },
  { home: "Seen off at the door: “Phir aana”", site: "“Phir zaroor aana — please come again.”" },
];

const trust = [
  { icon: BadgeIndianRupee, title: "One fixed price", body: "The price you see is the full price. Nothing is added later." },
  { icon: RotateCcw, title: "Clear refund rules", body: "Shown on every listing, before you pay." },
  { icon: MapPinned, title: "Location shared", body: "The home's exact address is shared once your visit is confirmed." },
  { icon: Utensils, title: "Your comfort first", body: "Diet and allergy notes go to your host before you arrive." },
  { icon: ShieldCheck, title: "Honest labels", body: "Sample hosts are marked. Test payments say TEST PAYMENT. No invented reviews." },
];

function Index() {
  const [showDoor, setShowDoor] = useState(true);
  const [entered, setEntered] = useState(false);
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sessionStorage.getItem(ENTERED_KEY)) {
      setShowDoor(false);
      setEntered(true);
    }
  }, []);

  // Scroll storytelling
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.to("[data-parallax]", {
        yPercent: -10,
        ease: "none",
        scrollTrigger: { trigger: "[data-hero]", start: "top top", end: "bottom top", scrub: true },
      });

      gsap.fromTo(
        "[data-word]",
        { opacity: 0.12 },
        {
          opacity: 1,
          stagger: 0.1,
          ease: "none",
          scrollTrigger: { trigger: "[data-manifesto]", start: "top 75%", end: "bottom 55%", scrub: true },
        },
      );

      gsap.fromTo(
        "[data-thread]",
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: { trigger: "[data-journey]", start: "top 70%", end: "bottom 70%", scrub: true },
        },
      );

      gsap.utils.toArray<HTMLElement>("[data-step]").forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 40,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 82%" },
        });
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  const handleEntered = () => {
    sessionStorage.setItem(ENTERED_KEY, "1");
    setShowDoor(false);
    setEntered(true);
  };

  const manifesto =
    "In India, the guest is God. Millions of homes live this every day — the cooking, the crafts, the stories — but they are invisible online. Mehmaan lets them welcome the world, in their own voice.";

  return (
    <div ref={pageRef}>
      {showDoor && <DoorEntrance onEntered={handleEntered} />}

      {/* HERO */}
      <section data-hero className="relative overflow-hidden bg-maroon-glow text-parchment-light">
        <MandalaCorner className="absolute left-0 top-0 h-40 w-40 sm:h-56 sm:w-56" />
        <MandalaCorner className="absolute right-0 top-0 h-40 w-40 -scale-x-100 sm:h-56 sm:w-56" />
        <MandalaCorner className="absolute bottom-0 left-0 h-40 w-40 -scale-y-100 sm:h-56 sm:w-56" />
        <MandalaCorner className="absolute bottom-0 right-0 h-40 w-40 -scale-100 sm:h-56 sm:w-56" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 sm:px-10 md:grid-cols-[1.1fr_0.9fr] md:py-28">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={entered ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="eyebrow text-gold">अतिथि देवो भव · Atithi Devo Bhava</p>
            <h1 className="mt-5 text-gold-sheen text-6xl leading-[1.2] sm:text-7xl lg:text-8xl">आइए, पधारिए</h1>
            <p className="mt-4 font-display text-2xl text-parchment-light sm:text-3xl">
              Aaiye, padhariye — come in, you are welcome.
            </p>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-parchment-light/85">
              Cook in a family kitchen, press blocks with a printing family, draw kolam at dawn. Indian homes,
              opened to you by the people who live in them.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Button asChild variant="gold" size="xl">
                <Link to="/experiences">Find an experience</Link>
              </Button>
              <Button asChild variant="ghostGold" size="xl">
                <Link to="/host">Open your home</Link>
              </Button>
            </div>
          </motion.div>

          <motion.figure
            initial={{ opacity: 0, scale: 0.96 }}
            animate={entered ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.96 }}
            transition={{ duration: 1.2, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto w-full max-w-sm md:max-w-md"
          >
            <div className="bg-gold-sheen p-[10px] shadow-lift" style={archClip}>
              <div className="bg-maroon-deep p-[3px]" style={archClip}>
                <div className="overflow-hidden" style={archClip}>
                  <img
                    data-parallax
                    src={pichwai.url}
                    alt="Pichhavai temple cloth: four women beneath a flowering tree on an indigo, star-scattered ground"
                    width={900}
                    height={1248}
                    className="aspect-[5/7] w-full scale-110 object-cover"
                  />
                </div>
              </div>
            </div>
            <figcaption className="mt-4 text-center text-xs text-parchment-light/65">
              Pichhavai, Rajasthan, 19th c. · The Met, public domain
            </figcaption>
          </motion.figure>
        </div>
      </section>

      <div className="block-border" aria-hidden="true" />

      {/* MANIFESTO */}
      <section data-manifesto className="mx-auto max-w-5xl px-6 py-24 text-center sm:py-32">
        <p className="eyebrow text-blockred">Our philosophy</p>
        <p className="mt-6 font-display text-3xl leading-snug text-maroon sm:text-5xl sm:leading-tight">
          {manifesto.split(" ").map((w, i) => (
            <span key={i} data-word className="inline-block pr-[0.28em]">
              {w}
            </span>
          ))}
        </p>
        <p className="mx-auto mt-8 max-w-2xl text-ink-soft">
          Atithi Devo Bhava is a value shared across Indian families and faiths — not a ritual. Hosts share
          what they already do at home, the way they already do it.
        </p>
      </section>

      {/* JOURNEY */}
      <section className="bg-parchment-light/60 py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center">
            <p className="eyebrow text-blockred">From the door to “phir aana”</p>
            <h2 className="mt-3 text-4xl text-maroon sm:text-5xl">Treated like a guest, at every step</h2>
          </div>

          <div data-journey className="relative mt-16">
            <div className="absolute bottom-0 left-5 top-0 w-px bg-border md:left-1/2" aria-hidden="true" />
            <div
              data-thread
              className="absolute bottom-0 left-5 top-0 w-[3px] origin-top -translate-x-px bg-gold-sheen md:left-1/2"
              aria-hidden="true"
            />
            <ol className="space-y-12">
              {journey.map((j, i) => (
                <li key={i} data-step className="relative grid gap-3 pl-14 md:grid-cols-2 md:gap-16 md:pl-0">
                  <span className="absolute left-5 top-1 flex h-9 w-9 -translate-x-1/2 items-center justify-center rounded-full bg-maroon font-display text-sm text-gold-bright ring-4 ring-parchment md:left-1/2">
                    {i + 1}
                  </span>
                  <div className="md:pr-10 md:text-right">
                    <p className="eyebrow text-ink-soft">In a real Indian home</p>
                    <p className="mt-1 text-xl font-semibold text-ink">{j.home}</p>
                  </div>
                  <div className="md:pl-10">
                    <p className="eyebrow text-blockred">On Mehmaan</p>
                    <p className="mt-1 font-display text-2xl text-maroon">{j.site}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <div className="block-border" aria-hidden="true" />

      {/* EXPERIENCES */}
      <section className="mx-auto max-w-7xl px-6 py-24 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow text-blockred">People first, then the price</p>
            <h2 className="mt-3 text-4xl text-maroon sm:text-5xl">Homes that are expecting you</h2>
          </div>
          <Button asChild variant="ink" size="xl">
            <Link to="/experiences">See all experiences</Link>
          </Button>
        </div>
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {experiences.slice(0, 3).map((exp, i) => (
            <ExperienceCard key={exp.slug} exp={exp} index={i} />
          ))}
        </div>
      </section>

      {/* TRUST */}
      <section className="mx-auto max-w-7xl px-6 sm:px-8">
        <div className="rounded-3xl bg-card p-8 shadow-card ring-1 ring-border sm:p-12">
          <div className="max-w-2xl">
            <p className="eyebrow text-blockred">Paani pehle — water first</p>
            <h2 className="mt-3 text-4xl text-maroon">Your questions, answered before you ask</h2>
            <p className="mt-3 text-ink-soft">
              In an Indian home, water comes before any question. Here, everything you need to trust a visit
              comes first.
            </p>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {trust.map((t, i) => (
              <motion.div
                key={t.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.07 }}
                className="rounded-2xl border border-dashed border-border bg-parchment/60 p-5"
              >
                <t.icon className="h-6 w-6 text-blockred" aria-hidden="true" />
                <p className="mt-3 font-semibold text-ink">{t.title}</p>
                <p className="mt-1 text-sm leading-relaxed text-ink-soft">{t.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* HOST CTA */}
      <section className="mx-auto mt-24 max-w-7xl px-6 sm:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-maroon-glow px-8 py-16 text-center text-parchment-light sm:px-16">
          <MandalaCorner className="absolute left-0 top-0 h-32 w-32" />
          <MandalaCorner className="absolute bottom-0 right-0 h-32 w-32 -scale-100" />
          <p className="eyebrow text-gold">For families</p>
          <h2 className="mt-3 text-4xl text-gold-bright sm:text-5xl">Your home. Your voice.</h2>
          <p className="mx-auto mt-4 max-w-xl text-parchment-light/85">
            Share the dish your grandmother taught you, the craft your family has kept for generations. Speak in
            your own language — we help your guest understand.
          </p>
          <Button asChild variant="gold" size="xl" className="mt-8">
            <Link to="/host">Become a host</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
