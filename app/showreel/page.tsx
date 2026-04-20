import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Reveal } from "@/components/reveal";
import { Play } from "lucide-react";

export const metadata: Metadata = {
  title: "Showreel",
  description:
    "Videography showreel and short films by Samuel Dascalu — weddings, brand films, and travel.",
};

// Swap these for your actual Vimeo / Mux IDs when ready.
const SHOWREEL = {
  title: "Showreel — 2026",
  subtitle: "90 seconds of 2023–2026",
  // Poster frame placeholder (will be replaced with a real video later).
  poster:
    "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=2400&q=80",
  // Vimeo embed URL — replace with a real one, e.g.
  // "https://player.vimeo.com/video/123456789?autoplay=0&title=0&byline=0&portrait=0"
  embedUrl: "",
};

const SHORTS = [
  {
    title: "Morning in Bran",
    excerpt: "Wedding film · 2026",
    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "A studio hour",
    excerpt: "Portrait film · 2026",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Nordic Roads",
    excerpt: "Travel film · 2026",
    image:
      "https://images.unsplash.com/photo-1518623489648-a173ef7824f3?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Brand film — Elm",
    excerpt: "Commercial · 2025",
    image:
      "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?auto=format&fit=crop&w=1200&q=80",
  },
];

export default function ShowreelPage() {
  return (
    <div>
      {/* Hero reel */}
      <section className="pt-32 md:pt-40 pb-16 md:pb-24 bg-[color:var(--ink)] text-[color:var(--bone)]">
        <div className="max-w-[1600px] mx-auto px-6 md:px-10">
          <Reveal>
            <p className="eyebrow text-[color:var(--accent)] mb-6">Moving image</p>
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl leading-[1.02] tracking-[-0.02em] mb-6">
              {SHOWREEL.title}
            </h1>
            <p className="eyebrow text-[color:var(--bone)]/60 mb-12">{SHOWREEL.subtitle}</p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="relative aspect-video w-full bg-black overflow-hidden">
              {SHOWREEL.embedUrl ? (
                <iframe
                  src={SHOWREEL.embedUrl}
                  className="absolute inset-0 w-full h-full"
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                  title="Showreel"
                />
              ) : (
                <>
                  <Image
                    src={SHOWREEL.poster}
                    alt="Showreel poster"
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 1400px"
                    className="object-cover opacity-70"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex flex-col items-center gap-4 text-[color:var(--bone)]">
                      <div className="h-20 w-20 md:h-24 md:w-24 rounded-full border border-[color:var(--bone)]/40 flex items-center justify-center backdrop-blur-sm bg-white/5">
                        <Play size={28} className="ml-1" />
                      </div>
                      <p className="eyebrow text-[color:var(--bone)]/80">
                        Video coming soon
                      </p>
                    </div>
                  </div>
                </>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Shorts grid */}
      <section className="py-24 md:py-40 max-w-[1600px] mx-auto px-6 md:px-10">
        <Reveal>
          <p className="eyebrow text-[color:var(--muted)] mb-4">Short films</p>
          <h2 className="font-display text-4xl md:text-6xl leading-[1.05] mb-16 md:mb-20 max-w-2xl">
            Stories, in motion.
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-16 md:gap-y-24">
          {SHORTS.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.05} className={i % 2 === 1 ? "md:mt-24" : ""}>
              <div className="group relative aspect-video overflow-hidden bg-[color:var(--line)]">
                <Image
                  src={s.image}
                  alt={s.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-1000 group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-16 w-16 rounded-full border border-white/50 flex items-center justify-center text-white backdrop-blur-sm bg-white/5 group-hover:bg-white/10 transition">
                    <Play size={20} className="ml-0.5" />
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <p className="eyebrow text-[color:var(--muted)]">{s.excerpt}</p>
                <h3 className="font-display text-2xl md:text-3xl mt-1">{s.title}</h3>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[color:var(--bone)] border-t border-[color:var(--line)] py-24 md:py-32">
        <div className="max-w-5xl mx-auto px-6 md:px-10 text-center">
          <Reveal>
            <h2 className="font-display text-3xl md:text-5xl leading-[1.1] mb-8 max-w-2xl mx-auto">
              Have a film in mind?
            </h2>
            <Link
              href="/contact"
              className="inline-block font-display text-xl md:text-2xl border-b border-[color:var(--ink)] pb-1 hover:text-[color:var(--accent)] hover:border-[color:var(--accent)] transition-colors"
            >
              Get in touch →
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
