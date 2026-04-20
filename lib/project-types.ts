export type ProjectCategory =
  | "weddings"
  | "portraits"
  | "events"
  | "commercial"
  | "travel";

export interface ProjectMeta {
  slug: string;
  title: string;
  date: string;
  category: ProjectCategory;
  location?: string;
  client?: string;
  excerpt?: string;
  cover: string;
  gallery: string[];
  featured?: boolean;
  tags?: string[];
}

export interface Project extends ProjectMeta {
  body: string;
}

export const ALL_CATEGORIES: { value: ProjectCategory | "all"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "weddings", label: "Weddings" },
  { value: "portraits", label: "Portraits" },
  { value: "events", label: "Events" },
  { value: "commercial", label: "Commercial" },
  { value: "travel", label: "Travel" },
];
