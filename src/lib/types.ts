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
