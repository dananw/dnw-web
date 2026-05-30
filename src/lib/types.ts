export interface Profile {
  name: string;
  title: string;
  bio: string;
  avatar: string;
  social: {
    github: string;
    linkedin: string;
    email: string;
    twitter?: string;
    upwork?: string;
  };
  stats?: Stat[];
}

export interface Stat {
  label: string;
  value: string;
}

export interface Testimonial {
  id: string;
  projectTitle: string;
  date: string;
  rating: number; // 1-5
  quote: string;
  client?: string;
  source?: string;
}

export interface WorkHistoryItem {
  id: string;
  title: string;
  period: string;
  rating?: number; // 1-5, optional (some jobs have no public rating)
  tags: string[];
  description: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  techStack: string[];
  features: string[];
  liveUrl?: string;
  githubUrl?: string;
  category: "frontend" | "fullstack" | "mobile";
  year: number;
}

export interface Skill {
  name: string;
  level: number; // 1-5
  category: "frontend" | "backend" | "tools" | "other";
  icon?: string;
}

export type ProjectCategory = "frontend" | "fullstack" | "mobile";
export type SkillCategory = "frontend" | "backend" | "tools" | "other";

export type ToolCategory = "text" | "dev" | "format" | "misc";

export interface Tool {
  /** URL slug, used as /tools/<slug> */
  slug: string;
  title: string;
  description: string;
  /** Short tagline shown on the index card */
  tagline: string;
  category: ToolCategory;
  tags: string[];
  /** lucide-react icon name, resolved in the UI */
  icon: string;
  /** Set false to hide from the index while keeping the route */
  published?: boolean;
}
