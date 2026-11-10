import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="mt-24 bg-maroon-glow text-parchment-light">
      <div className="block-border" aria-hidden="true" />
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-8 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="font-display text-4xl text-gold-bright sm:text-5xl">फिर ज़रूर आना</p>
          <p className="mt-3 max-w-md text-parchment-light/85">
            Phir zaroor aana — please come again. In an Indian home, a guest is seen off at the door. We
            hope you leave Mehmaan feeling the same.
          </p>
        </div>
        <nav className="flex flex-col gap-3 text-sm" aria-label="Footer">
          <p className="eyebrow text-gold">Explore</p>
          <Link to="/experiences" className="hover:text-gold-bright">
            Experiences
          </Link>
          <Link to="/host" className="hover:text-gold-bright">
            Become a host
          </Link>
          <Link to="/" className="hover:text-gold-bright">
            Home
          </Link>
        </nav>
        <div className="text-xs leading-relaxed text-parchment-light/70">
          <p className="eyebrow text-gold">Honest by design</p>
          <p className="mt-3">
            Hosts shown here are sample, role-played listings. Payments in this preview are test
            payments only.
          </p>
          <p className="mt-3">
            Painting: Temple cloth (pichhavai), Rajasthan, 19th century — The Metropolitan Museum of
            Art, public domain (CC0). Door sound: Wikimedia Commons, public domain.
          </p>
        </div>
      </div>
      <div className="border-t border-gold/20 py-5 text-center text-xs text-parchment-light/60">
        अतिथि देवो भव · Mehmaan
      </div>
    </footer>
  );
}
