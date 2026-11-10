import { Link } from "@tanstack/react-router";
import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

const links = [
  { to: "/", label: "Home" },
  { to: "/experiences", label: "Experiences" },
  { to: "/host", label: "Become a host" },
] as const;

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 bg-parchment/90 backdrop-blur-md">
      <div className="block-border" aria-hidden="true" />
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-5 py-3 sm:px-8">
        <Link to="/" className="group flex items-baseline gap-2" aria-label="Mehmaan home">
          <span className="font-display text-3xl text-maroon">Mehmaan</span>
          <span className="font-display text-lg text-blockred/80">मेहमान</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Main">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="relative text-sm font-semibold text-ink-soft transition-colors hover:text-maroon"
              activeProps={{ className: "text-maroon after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-full after:bg-gold" }}
              activeOptions={{ exact: true }}
            >
              {l.label}
            </Link>
          ))}
          <Button asChild variant="maroon" size="sm" className="rounded-full px-5">
            <Link to="/experiences">Find an experience</Link>
          </Button>
        </nav>

        <Sheet>
          <SheetTrigger asChild>
            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-maroon md:hidden"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          </SheetTrigger>
          <SheetContent side="right" className="bg-parchment">
            <SheetTitle className="font-display text-3xl font-normal text-maroon">Mehmaan</SheetTitle>
            <nav className="mt-8 flex flex-col gap-5" aria-label="Mobile">
              {links.map((l) => (
                <Link key={l.to} to={l.to} className="font-display text-2xl text-ink hover:text-maroon">
                  {l.label}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
      <div className="h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent" />
    </header>
  );
}
