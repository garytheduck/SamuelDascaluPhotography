import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getAllProjects, getProjectBySlug } from "@/lib/projects";
import { Reveal } from "@/components/reveal";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllProjects().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: "Not found" };
  return {
    title: project.title,
    description: project.excerpt ?? `${project.category} — ${project.title}`,
    openGraph: {
      title: project.title,
      description: project.excerpt ?? undefined,
      images: [{ url: project.cover }],
    },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const all = getAllProjects();
  const idx = all.findIndex((p) => p.slug === slug);
  const prev = idx > 0 ? all[idx - 1] : all[all.length - 1];
  const next = idx < all.length - 1 ? all[idx + 1] : all[0];

  return (
    <article>
      {/* HERO cover — full bleed */}
      <section className="relative h-[70svh] md:h-[100svh] min-h-[520px] w-full overflow-hidden bg-[color:var(--ink)] text-[color:var(--bone)]">
        <Image
          src={project.cover}
          alt={project.title}
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/70" />
        <div className="relative z-10 h-full flex flex-col justify-end px-6 md:px-10 pb-14 md:pb-20 max-w-[1600px] mx-auto">
          <p className="eyebrow text-[color:var(--accent)] mb-4">
            {project.category}
            {project.location ? ` · ${project.location}` : ""}
          </p>
          <h1 className="font-display text-[clamp(2.5rem,8vw,8rem)] leading-[0.95] tracking-[-0.02em] font-light max-w-5xl">
            {project.title}
          </h1>
        </div>
      </section>

      {/* Meta + story */}
      <section className="max-w-[1600px] mx-auto px-6 md:px-10 py-24 md:py-32 grid grid-cols-1 md:grid-cols-12 gap-12">
        <Reveal className="md:col-span-4">
          <dl className="space-y-6">
            <div>
              <dt className="eyebrow text-[color:var(--muted)] mb-1">Year</dt>
              <dd>{new Date(project.date).getFullYear()}</dd>
            </div>
            {project.location && (
              <div>
                <dt className="eyebrow text-[color:var(--muted)] mb-1">Location</dt>
                <dd>{project.location}</dd>
              </div>
            )}
            {project.client && (
              <div>
                <dt className="eyebrow text-[color:var(--muted)] mb-1">Client</dt>
                <dd>{project.client}</dd>
              </div>
            )}
            <div>
              <dt className="eyebrow text-[color:var(--muted)] mb-1">Category</dt>
              <dd className="capitalize">{project.category}</dd>
            </div>
          </dl>
        </Reveal>

        <Reveal className="md:col-span-7 md:col-start-6" delay={0.1}>
          <div className="prose-lg font-display text-2xl md:text-3xl leading-snug tracking-[-0.01em] whitespace-pre-wrap">
            {project.body}
          </div>
        </Reveal>
      </section>

      {/* GALLERY — editorial varying sizes */}
      {project.gallery.length > 0 && (
        <section className="max-w-[1600px] mx-auto px-6 md:px-10 pb-24 md:pb-32">
          <div className="flex flex-col gap-10 md:gap-20">
            {project.gallery.map((src, i) => {
              // Pattern: full-bleed, then split pair, then full, then offset.
              const mod = i % 5;
              if (mod === 0 || mod === 3) {
                return (
                  <Reveal key={i}>
                    <div className="relative aspect-[16/9] bg-[color:var(--line)] overflow-hidden">
                      <Image
                        src={src}
                        alt={`${project.title} — ${i + 1}`}
                        fill
                        sizes="(max-width: 768px) 100vw, 1400px"
                        className="object-cover"
                      />
                    </div>
                  </Reveal>
                );
              }
              if (mod === 1 && project.gallery[i + 1]) {
                return (
                  <div key={i} className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
                    <Reveal>
                      <div className="relative aspect-[3/4] bg-[color:var(--line)] overflow-hidden">
                        <Image
                          src={src}
                          alt={`${project.title} — ${i + 1}`}
                          fill
                          sizes="(max-width: 768px) 100vw, 50vw"
                          className="object-cover"
                        />
                      </div>
                    </Reveal>
                    <Reveal className="md:mt-24" delay={0.1}>
                      <div className="relative aspect-[3/4] bg-[color:var(--line)] overflow-hidden">
                        <Image
                          src={project.gallery[i + 1]}
                          alt={`${project.title} — ${i + 2}`}
                          fill
                          sizes="(max-width: 768px) 100vw, 50vw"
                          className="object-cover"
                        />
                      </div>
                    </Reveal>
                  </div>
                );
              }
              if (mod === 2) return null; // already rendered in pair
              // mod === 4: offset single
              return (
                <Reveal key={i} className="md:w-2/3 md:ml-auto">
                  <div className="relative aspect-[4/5] bg-[color:var(--line)] overflow-hidden">
                    <Image
                      src={src}
                      alt={`${project.title} — ${i + 1}`}
                      fill
                      sizes="(max-width: 768px) 100vw, 66vw"
                      className="object-cover"
                    />
                  </div>
                </Reveal>
              );
            })}
          </div>
        </section>
      )}

      {/* Prev / Next */}
      <section className="border-t border-[color:var(--line)] bg-[color:var(--bone)]">
        <div className="max-w-[1600px] mx-auto px-6 md:px-10 py-16 md:py-24 grid grid-cols-2 gap-6 md:gap-10">
          <Link href={`/work/${prev.slug}`} className="group">
            <p className="eyebrow text-[color:var(--muted)] mb-3">← Previous</p>
            <h3 className="font-display text-2xl md:text-4xl group-hover:text-[color:var(--accent)] transition-colors">
              {prev.title}
            </h3>
          </Link>
          <Link href={`/work/${next.slug}`} className="group text-right">
            <p className="eyebrow text-[color:var(--muted)] mb-3">Next →</p>
            <h3 className="font-display text-2xl md:text-4xl group-hover:text-[color:var(--accent)] transition-colors">
              {next.title}
            </h3>
          </Link>
        </div>
      </section>
    </article>
  );
}
