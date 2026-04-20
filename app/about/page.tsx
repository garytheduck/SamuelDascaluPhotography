import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Samuel Dascalu — a photographer and videographer based in Romania, working with weddings, portraits, and brands.",
};

export default function AboutPage() {
  return (
    <div className="pt-32 md:pt-40 pb-24 md:pb-40">
      {/* Intro */}
      <section className="max-w-[1600px] mx-auto px-6 md:px-10 grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-20 items-start">
        <Reveal className="md:col-span-5">
          <div className="relative aspect-[3/4] bg-[color:var(--line)] overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1600&q=80"
              alt="Samuel Dascalu portrait"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 40vw"
              className="object-cover"
            />
          </div>
        </Reveal>

        <Reveal className="md:col-span-6 md:col-start-7" delay={0.1}>
          <p className="eyebrow text-[color:var(--muted)] mb-6">About</p>
          <h1 className="font-display text-5xl md:text-7xl leading-[1.02] tracking-[-0.02em] mb-10">
            Hi, I&apos;m Samuel.
          </h1>
          <div className="space-y-6 text-lg leading-relaxed text-[color:var(--ink)]/85 max-w-xl">
            <p>
              I&apos;m a photographer and videographer based in Romania, working between the
              Carpathians and the Black Sea — and increasingly, wherever the story goes.
            </p>
            <p>
              I started picking up a camera because I wanted to hold onto moments that felt too
              fast to live twice. That impulse hasn&apos;t really changed. The gear got better,
              the calendar filled up, but the goal is still the same: pay close attention, press
              the shutter quietly, and hand something back that feels <em>true</em>.
            </p>
            <p>
              I shoot weddings that don&apos;t look like weddings, portraits that feel like a
              conversation, and commercial work for brands that understand restraint. Film and
              stills, usually together.
            </p>
          </div>
        </Reveal>
      </section>

      {/* Process */}
      <section className="max-w-[1600px] mx-auto px-6 md:px-10 mt-32 md:mt-48">
        <Reveal>
          <p className="eyebrow text-[color:var(--muted)] mb-6">Process</p>
          <h2 className="font-display text-4xl md:text-6xl leading-[1.05] max-w-3xl mb-16 md:mb-24">
            How we work together.
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
          {[
            {
              n: "01",
              title: "A conversation",
              body:
                "We start with a call or coffee — I want to understand who you are, what you care about, and what the finished work should feel like. No template briefs.",
            },
            {
              n: "02",
              title: "The shoot",
              body:
                "Minimal interference, plenty of patience. I shoot both digital and film when it fits, and bring a second shooter for larger events.",
            },
            {
              n: "03",
              title: "The edit",
              body:
                "Honest grading, no over-processing. You get a private gallery within 3–4 weeks, plus a curated selection ready for print and web.",
            },
          ].map((step, i) => (
            <Reveal key={step.n} delay={i * 0.08}>
              <div>
                <p className="font-display text-5xl text-[color:var(--accent)] mb-4">{step.n}</p>
                <h3 className="font-display text-2xl md:text-3xl mb-4">{step.title}</h3>
                <p className="text-[color:var(--muted)] leading-relaxed">{step.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Gear / specs */}
      <section className="max-w-[1600px] mx-auto px-6 md:px-10 mt-32 md:mt-48 grid grid-cols-1 md:grid-cols-12 gap-12">
        <Reveal className="md:col-span-4">
          <p className="eyebrow text-[color:var(--muted)] mb-6">Tools</p>
          <h2 className="font-display text-3xl md:text-4xl leading-tight max-w-xs">
            The bag, roughly.
          </h2>
        </Reveal>

        <div className="md:col-span-7 md:col-start-6 grid grid-cols-2 gap-x-8 gap-y-6 text-sm md:text-base">
          {[
            ["Stills", "Sony A7IV · Leica M6"],
            ["Moving image", "Sony FX3 · DJI RS3"],
            ["Lenses", "24/1.4 · 35/1.4 · 50/1.2 · 85/1.4"],
            ["Film stocks", "Portra 400 · HP5+ · Gold 200"],
            ["Audio", "Rode Wireless Pro · DPA 4060"],
            ["Drone", "DJI Mavic 3 Pro"],
          ].map(([k, v]) => (
            <div key={k} className="border-t border-[color:var(--line)] pt-4">
              <dt className="eyebrow text-[color:var(--muted)] mb-1">{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-5xl mx-auto px-6 md:px-10 mt-32 md:mt-48 text-center">
        <Reveal>
          <h2 className="font-display text-4xl md:text-6xl leading-[1.05] mb-10">
            Want to work together?
          </h2>
          <Link
            href="/contact"
            className="inline-block font-display text-xl md:text-2xl border-b border-[color:var(--ink)] pb-1 hover:text-[color:var(--accent)] hover:border-[color:var(--accent)] transition-colors"
          >
            Say hello →
          </Link>
        </Reveal>
      </section>
    </div>
  );
}
