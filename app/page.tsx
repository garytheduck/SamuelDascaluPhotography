import Link from "next/link";
import Image from "next/image";
import { getFeaturedProjects, getAllProjects } from "@/lib/projects";
import { ProjectCard } from "@/components/project-card";
import { Reveal } from "@/components/reveal";

export default function HomePage() {
  const featured = getFeaturedProjects(4);
  const latest = getAllProjects().slice(0, 8);
  const heroProject = featured[0] ?? latest[0];

  return (
    <>
      {/* HERO — dark cinematic */}
      <section className="relative h-[100svh] min-h-[640px] w-full overflow-hidden bg-[color:var(--ink)] text-[color:var(--bone)]">
        {heroProject?.cover && (
          <div className="absolute inset-0">
            <Image
              src={heroProject.cover}
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover opacity-70 ken-burns"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/80" />
          </div>
        )}

        <div className="relative z-10 h-full flex flex-col justify-end px-6 md:px-10 pb-16 md:pb-24 max-w-[1600px] mx-auto w-full">
          <Reveal delay={0.1}>
            <p className="eyebrow text-[color:var(--accent)] mb-6 md:mb-10">
              Photography & Videography · Romania
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <h1 className="font-display text-[clamp(3rem,11vw,11rem)] leading-[0.9] tracking-[-0.03em] font-light">
              Samuel
              <br />
              Dascalu
            </h1>
          </Reveal>

          <Reveal delay={0.4}>
            <div className="mt-10 md:mt-14 flex flex-col md:flex-row md:items-end md:justify-between gap-6 md:gap-10">
              <p className="max-w-md text-[color:var(--bone)]/85 text-base md:text-lg leading-relaxed">
                Quiet, cinematic storytelling through stills and moving image — for weddings,
                portraits, and brands that value restraint.
              </p>
              <div className="flex items-center gap-8">
                <Link
                  href="/work"
                  className="eyebrow border-b border-[color:var(--bone)]/40 pb-1 hover:border-[color:var(--accent)] hover:text-[color:var(--accent)] transition-colors"
                >
                  View Work
                </Link>
                <Link
                  href="/contact"
                  className="eyebrow border-b border-[color:var(--bone)]/40 pb-1 hover:border-[color:var(--accent)] hover:text-[color:var(--accent)] transition-colors"
                >
                  Book a Session
                </Link>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="absolute bottom-6 right-6 md:right-10 z-10 eyebrow text-[color:var(--bone)]/60 flex items-center gap-3">
          <span>Scroll</span>
          <span className="block w-10 h-px bg-[color:var(--bone)]/40" />
        </div>
      </section>

      {/* FEATURED WORK — editorial grid on cream */}
      <section className="px-6 md:px-10 py-24 md:py-40 max-w-[1600px] mx-auto">
        <Reveal>
          <div className="flex items-end justify-between mb-14 md:mb-24">
            <div>
              <p className="eyebrow text-[color:var(--muted)] mb-4">Selected Work — 2025/26</p>
              <h2 className="font-display text-4xl md:text-6xl lg:text-7xl leading-[1.05] max-w-2xl">
                Stories told in light.
              </h2>
            </div>
            <Link
              href="/work"
              className="hidden md:inline-block eyebrow border-b border-[color:var(--ink)]/30 pb-1 hover:border-[color:var(--accent)] hover:text-[color:var(--accent)] transition-colors"
            >
              All projects →
            </Link>
          </div>
        </Reveal>

        {featured.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 md:gap-y-24">
            {featured[0] && (
              <Reveal className="md:col-span-7">
                <ProjectCard project={featured[0]} priority aspect="landscape" size="lg" />
              </Reveal>
            )}
            {featured[1] && (
              <Reveal className="md:col-span-5 md:mt-32" delay={0.1}>
                <ProjectCard project={featured[1]} aspect="portrait" size="md" />
              </Reveal>
            )}
            {featured[2] && (
              <Reveal className="md:col-span-5 md:col-start-2" delay={0.05}>
                <ProjectCard project={featured[2]} aspect="portrait" size="md" />
              </Reveal>
            )}
            {featured[3] && (
              <Reveal className="md:col-span-6 md:col-start-7 md:mt-24" delay={0.15}>
                <ProjectCard project={featured[3]} aspect="landscape" size="md" />
              </Reveal>
            )}
          </div>
        ) : (
          <p className="text-[color:var(--muted)]">No projects yet.</p>
        )}

        <div className="mt-16 md:hidden">
          <Link href="/work" className="eyebrow border-b border-[color:var(--ink)]/30 pb-1">
            All projects →
          </Link>
        </div>
      </section>

      {/* PHILOSOPHY / PULL QUOTE */}
      <section className="bg-[color:var(--bone)] px-6 md:px-10 py-32 md:py-48 border-y border-[color:var(--line)]">
        <div className="max-w-4xl mx-auto text-center">
          <Reveal>
            <p className="eyebrow text-[color:var(--muted)] mb-8">Approach</p>
            <p className="font-display text-3xl md:text-5xl lg:text-6xl leading-[1.15] tracking-[-0.01em]">
              &ldquo;The camera is an excuse to pay attention. I&apos;m drawn to
              <em className="text-[color:var(--accent)]"> quiet moments</em> — the second before
              someone laughs, the pause between two songs, the light on a wall at 5pm.&rdquo;
            </p>
            <p className="mt-10 eyebrow text-[color:var(--muted)]">— Samuel</p>
          </Reveal>
        </div>
      </section>

      {/* LATEST — horizontal scroll strip */}
      {latest.length > 0 && (
        <section className="py-24 md:py-40 overflow-hidden">
          <div className="max-w-[1600px] mx-auto px-6 md:px-10 mb-12 md:mb-16 flex items-end justify-between">
            <Reveal>
              <p className="eyebrow text-[color:var(--muted)] mb-4">Recent</p>
              <h2 className="font-display text-3xl md:text-5xl">Latest frames</h2>
            </Reveal>
            <Link
              href="/work"
              className="eyebrow border-b border-[color:var(--ink)]/30 pb-1 hover:text-[color:var(--accent)] hover:border-[color:var(--accent)] transition-colors"
            >
              Browse all →
            </Link>
          </div>

          <div className="flex gap-6 md:gap-10 overflow-x-auto pb-6 px-6 md:px-10 snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {latest.map((p) => (
              <Link
                key={p.slug}
                href={`/work/${p.slug}`}
                className="group relative shrink-0 w-[78vw] md:w-[360px] snap-start"
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-[color:var(--line)]">
                  <Image
                    src={p.cover}
                    alt={p.title}
                    fill
                    sizes="(max-width: 768px) 78vw, 360px"
                    className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                  />
                </div>
                <div className="mt-3">
                  <p className="eyebrow text-[color:var(--muted)]">{p.category}</p>
                  <h3 className="font-display text-xl md:text-2xl mt-1">{p.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* CTA banner before footer */}
      <section className="px-6 md:px-10 py-24 md:py-32">
        <div className="max-w-5xl mx-auto text-center">
          <Reveal>
            <p className="eyebrow text-[color:var(--muted)] mb-6">Available for 2026 bookings</p>
            <h2 className="font-display text-4xl md:text-6xl lg:text-7xl leading-[1.05] mb-10">
              Let&apos;s make something you&apos;ll keep.
            </h2>
            <Link
              href="/contact"
              className="inline-block font-display text-xl md:text-2xl border-b border-[color:var(--ink)] pb-1 hover:text-[color:var(--accent)] hover:border-[color:var(--accent)] transition-colors"
            >
              Start the conversation →
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
