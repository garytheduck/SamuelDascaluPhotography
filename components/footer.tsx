import Link from "next/link";
import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="bg-[color:var(--ink)] text-[color:var(--bone)]">
      <div className="max-w-[1600px] mx-auto px-6 md:px-10 py-20 md:py-28">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
          <div className="md:col-span-6">
            <p className="eyebrow text-[color:var(--accent)] mb-4">Let&apos;s work together</p>
            <h2 className="font-display text-4xl md:text-6xl leading-[1.05] mb-8 max-w-xl">
              Have a story worth telling?
            </h2>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 font-display text-xl border-b border-[color:var(--bone)]/40 pb-1 hover:border-[color:var(--accent)] hover:text-[color:var(--accent)] transition-colors"
            >
              Start a project →
            </Link>
          </div>

          <div className="md:col-span-3 md:col-start-8">
            <p className="eyebrow text-[color:var(--muted)] mb-4">Contact</p>
            <ul className="space-y-2 text-sm">
              <li>
                <a href={`mailto:${site.email}`} className="hover:text-[color:var(--accent)]">
                  {site.email}
                </a>
              </li>
              <li className="text-[color:var(--muted)]">{site.location}</li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <p className="eyebrow text-[color:var(--muted)] mb-4">Elsewhere</p>
            <ul className="space-y-2 text-sm">
              <li>
                <a href={site.socials.instagram} target="_blank" rel="noreferrer" className="hover:text-[color:var(--accent)]">
                  Instagram
                </a>
              </li>
              <li>
                <a href={site.socials.youtube} target="_blank" rel="noreferrer" className="hover:text-[color:var(--accent)]">
                  YouTube
                </a>
              </li>
              <li>
                <a href={site.socials.vimeo} target="_blank" rel="noreferrer" className="hover:text-[color:var(--accent)]">
                  Vimeo
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-20 pt-8 border-t border-[color:var(--bone)]/10 flex flex-col md:flex-row justify-between gap-4 eyebrow text-[color:var(--muted)]">
          <span>© {new Date().getFullYear()} Samuel Dascalu</span>
          <span>Crafted with care</span>
        </div>
      </div>
    </footer>
  );
}
