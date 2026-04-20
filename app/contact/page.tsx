import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
import { Reveal } from "@/components/reveal";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Samuel Dascalu for photography and videography bookings — weddings, portraits, and commercial work.",
};

export default function ContactPage() {
  return (
    <div className="pt-32 md:pt-40 pb-24 md:pb-40">
      <div className="max-w-[1600px] mx-auto px-6 md:px-10 grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-20">
        <Reveal className="md:col-span-5">
          <p className="eyebrow text-[color:var(--muted)] mb-6">Contact</p>
          <h1 className="font-display text-5xl md:text-7xl leading-[1.02] tracking-[-0.02em] mb-10">
            Let&apos;s talk.
          </h1>
          <p className="text-lg leading-relaxed text-[color:var(--ink)]/85 max-w-md mb-12">
            Tell me about your project — the dates, the feeling you&apos;re after, any links that
            inspire you. I reply within two business days.
          </p>

          <dl className="space-y-6">
            <div>
              <dt className="eyebrow text-[color:var(--muted)] mb-1">Direct email</dt>
              <dd>
                <a href={`mailto:${site.email}`} className="hover:text-[color:var(--accent)]">
                  {site.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="eyebrow text-[color:var(--muted)] mb-1">Based in</dt>
              <dd>{site.location}</dd>
            </div>
            <div>
              <dt className="eyebrow text-[color:var(--muted)] mb-1">Instagram</dt>
              <dd>
                <a
                  href={site.socials.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[color:var(--accent)]"
                >
                  @samueldascaluphotography
                </a>
              </dd>
            </div>
          </dl>
        </Reveal>

        <Reveal className="md:col-span-6 md:col-start-7" delay={0.1}>
          <ContactForm />
        </Reveal>
      </div>
    </div>
  );
}
