import Link from "next/link";
import Image from "next/image";
import type { Project } from "@/lib/project-types";
import { cn } from "@/lib/cn";

interface ProjectCardProps {
  project: Project;
  priority?: boolean;
  aspect?: "portrait" | "landscape" | "square";
  size?: "lg" | "md" | "sm";
}

const ASPECT = {
  portrait: "aspect-[3/4]",
  landscape: "aspect-[4/3]",
  square: "aspect-square",
};

export function ProjectCard({
  project,
  priority,
  aspect = "portrait",
  size = "md",
}: ProjectCardProps) {
  return (
    <Link href={`/work/${project.slug}`} className="group block">
      <div className={cn("relative overflow-hidden bg-[color:var(--line)]", ASPECT[aspect])}>
        <Image
          src={project.cover}
          alt={project.title}
          fill
          priority={priority}
          sizes={
            size === "lg"
              ? "(max-width: 768px) 100vw, 66vw"
              : size === "md"
                ? "(max-width: 768px) 100vw, 50vw"
                : "(max-width: 768px) 50vw, 33vw"
          }
          className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
      <div className="mt-4 flex items-baseline justify-between gap-4">
        <div>
          <p className="eyebrow text-[color:var(--muted)] mb-1">
            {project.category}
            {project.location ? ` · ${project.location}` : ""}
          </p>
          <h3
            className={cn(
              "font-display leading-tight",
              size === "lg" ? "text-3xl md:text-4xl" : size === "md" ? "text-2xl md:text-3xl" : "text-xl md:text-2xl"
            )}
          >
            {project.title}
          </h3>
        </div>
        <span className="eyebrow text-[color:var(--muted)] whitespace-nowrap">
          {new Date(project.date).getFullYear()}
        </span>
      </div>
    </Link>
  );
}
