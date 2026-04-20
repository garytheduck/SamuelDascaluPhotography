"use client";

import { useMemo, useState } from "react";
import { ALL_CATEGORIES, type Project, type ProjectCategory } from "@/lib/project-types";
import { ProjectCard } from "@/components/project-card";
import { cn } from "@/lib/cn";

interface WorkGridProps {
  projects: Project[];
}

export function WorkGrid({ projects }: WorkGridProps) {
  const [active, setActive] = useState<ProjectCategory | "all">("all");

  const filtered = useMemo(() => {
    if (active === "all") return projects;
    return projects.filter((p) => p.category === active);
  }, [projects, active]);

  return (
    <>
      {/* Filter bar */}
      <div className="flex flex-wrap gap-2 md:gap-3 mb-16 md:mb-20 border-b border-[color:var(--line)] pb-8">
        {ALL_CATEGORIES.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setActive(cat.value)}
            className={cn(
              "eyebrow px-4 py-2 rounded-full border transition-colors",
              active === cat.value
                ? "bg-[color:var(--ink)] text-[color:var(--bone)] border-[color:var(--ink)]"
                : "border-[color:var(--line)] text-[color:var(--muted)] hover:border-[color:var(--ink)] hover:text-[color:var(--ink)]"
            )}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="text-[color:var(--muted)] py-20 text-center">
          No projects in this category yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 md:gap-x-12 gap-y-16 md:gap-y-28">
          {filtered.map((p, i) => (
            <div
              key={p.slug}
              className={cn(
                // Alternating vertical offset for editorial feel
                i % 2 === 1 && "md:mt-32"
              )}
            >
              <ProjectCard project={p} aspect={i % 3 === 1 ? "landscape" : "portrait"} />
            </div>
          ))}
        </div>
      )}
    </>
  );
}
