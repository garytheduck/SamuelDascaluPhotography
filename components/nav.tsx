"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { site } from "@/lib/site";
import { cn } from "@/lib/cn";

export function Nav() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // On home page we start transparent over the dark hero, switch to solid after scroll.
  // On other pages, always solid cream bg with dark text.
  const transparentOverHero = isHome && !scrolled;

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-colors duration-500",
        transparentOverHero
          ? "bg-transparent text-[color:var(--bone)]"
          : "bg-[color:var(--cream)]/85 backdrop-blur-md text-[color:var(--ink)] border-b border-[color:var(--line)]"
      )}
    >
      <div className="max-w-[1600px] mx-auto px-6 md:px-10 h-16 md:h-20 flex items-center justify-between">
        <Link
          href="/"
          className="font-display text-lg md:text-xl tracking-tight"
          aria-label="Samuel Dascalu — Home"
        >
          Samuel Dascalu
        </Link>

        <nav className="hidden md:flex items-center gap-10">
          {site.nav.map((item) => {
            const active = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "eyebrow hover:opacity-70 transition-opacity",
                  active && "opacity-100 underline underline-offset-8 decoration-1"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <button
          onClick={() => setOpen(true)}
          className="md:hidden p-2 -mr-2"
          aria-label="Open menu"
        >
          <Menu size={22} />
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-[60] bg-[color:var(--ink)] text-[color:var(--bone)] md:hidden">
          <div className="h-16 px-6 flex items-center justify-between">
            <span className="font-display text-lg">Samuel Dascalu</span>
            <button onClick={() => setOpen(false)} aria-label="Close menu" className="p-2 -mr-2">
              <X size={22} />
            </button>
          </div>
          <nav className="px-6 pt-8 flex flex-col gap-8">
            {site.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="font-display text-4xl"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
