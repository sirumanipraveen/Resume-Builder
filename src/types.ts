export interface Experience {
  company: string;
  role: string;
  period: string;
  location: string;
  bullets: string[];
}

export interface Project {
  name: string;
  description: string;
  technologies: string[];
  bullets: string[];
}

export interface Education {
  institution: string;
  degree: string;
  period: string;
  location: string;
}

export interface ResumeData {
  summary: string;
  skills: string[];
  experience: Experience[];
  projects: Project[];
  education: Education[];
}

export interface UserInput {
  name: string;
  targetRole: string;
  experience: string;
  skills: string;
  projects: string;
  education: string;
}
