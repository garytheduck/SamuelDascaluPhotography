import "server-only";
import { readdirSync, readFileSync, statSync, existsSync } from "fs";
import { join } from "path";
import matter from "gray-matter";
import type { Project, ProjectCategory } from "./project-types";

export type { Project, ProjectCategory, ProjectMeta } from "./project-types";
export { ALL_CATEGORIES } from "./project-types";

const PROJECTS_DIR = join(process.cwd(), "content", "projects");

function isDirectory(p: string) {
  try {
    return statSync(p).isDirectory();
  } catch {
    return false;
  }
}

export function getAllProjects(): Project[] {
  if (!existsSync(PROJECTS_DIR)) return [];

  const slugs = readdirSync(PROJECTS_DIR).filter((name) =>
    isDirectory(join(PROJECTS_DIR, name))
  );

  const projects: Project[] = slugs
    .map((slug) => {
      const mdxPath = join(PROJECTS_DIR, slug, "index.mdx");
      if (!existsSync(mdxPath)) return null;
      const raw = readFileSync(mdxPath, "utf8");
      const { data, content } = matter(raw);
      return {
        slug,
        title: data.title ?? slug,
        date: data.date ?? new Date().toISOString(),
        category: (data.category ?? "portraits") as ProjectCategory,
        location: data.location,
        client: data.client,
        excerpt: data.excerpt,
        cover: data.cover ?? `/projects/${slug}/cover.jpg`,
        gallery: Array.isArray(data.gallery) ? data.gallery : [],
        featured: Boolean(data.featured),
        tags: data.tags ?? [],
        body: content,
      } as Project;
    })
    .filter((p): p is Project => p !== null)
    .sort((a, b) => +new Date(b.date) - +new Date(a.date));

  return projects;
}

export function getProjectBySlug(slug: string): Project | null {
  return getAllProjects().find((p) => p.slug === slug) ?? null;
}

export function getFeaturedProjects(limit = 4): Project[] {
  const all = getAllProjects();
  const featured = all.filter((p) => p.featured);
  return (featured.length ? featured : all).slice(0, limit);
}

export function getProjectsByCategory(
  category: ProjectCategory | "all"
): Project[] {
  const all = getAllProjects();
  if (category === "all") return all;
  return all.filter((p) => p.category === category);
}
