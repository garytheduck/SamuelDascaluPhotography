import type { Metadata } from "next";
import { getAllProjects } from "@/lib/projects";
import { WorkGrid } from "@/components/work-grid";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "Work",
  description: "Selected photography and videography projects by Samuel Dascalu.",
};

export default function WorkPage() {
  const projects = getAllProjects();

  return (
    <div className="pt-32 md:pt-40 pb-24 md:pb-40">
      <div className="max-w-[1600px] mx-auto px-6 md:px-10">
        <Reveal>
          <p className="eyebrow text-[color:var(--muted)] mb-6">Archive</p>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl leading-[1.02] tracking-[-0.02em] max-w-4xl mb-6">
            Selected work
          </h1>
          <p className="max-w-xl text-[color:var(--muted)] text-base md:text-lg leading-relaxed mb-16 md:mb-24">
            A running collection of projects across weddings, portraits, events, commercial, and
            travel. Filter below.
          </p>
        </Reveal>

        <WorkGrid projects={projects} />
      </div>
    </div>
  );
}
