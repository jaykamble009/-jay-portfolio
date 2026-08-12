"use client"

// Content management system for portfolio data
export interface HeroContent {
  name: string
  role: string
  description: string
  resumeUrl: string
  githubUrl: string
  linkedinUrl: string
  email: string
}

export interface AboutContent {
  title: string
  description: string
  journey: string
}

export interface Skill {
  name: string
  level: number
  icon: string
}

export interface Education {
  id: string
  degree: string
  institution: string
  year: string
  description: string
}

export interface Project {
  id: string
  title: string
  description: string
  image: string
  technologies: string[]
  liveUrl?: string
  githubUrl?: string
}

export interface ContactInfo {
  email: string
  phone: string
  location: string
}

// Default content
const defaultHeroContent: HeroContent = {
  name: "Jay Kamble",
  role: "Full Stack Developer",
  description:
    "Passionate about creating innovative web solutions with modern technologies. I specialize in React, Next.js, and building scalable applications.",
  resumeUrl: "/resume.pdf",
  githubUrl: "https://github.com/jaykamble009",
  linkedinUrl: "https://www.linkedin.com/in/jay-kamble-425892366",
  email: "jk365242@gmail.com",
}

const defaultAboutContent: AboutContent = {
  title: "My Journey",
  description: "I'm a dedicated Full Stack Developer with a passion for creating innovative web solutions.",
  journey:
    "My journey in web development started during my college years, where I discovered my love for coding and problem-solving. I've been continuously learning and adapting to new technologies, always striving to build better user experiences.",
}

const defaultSkills: Skill[] = [
  { name: "React", level: 90, icon: "⚛️" },
  { name: "Next.js", level: 85, icon: "▲" },
  { name: "TypeScript", level: 80, icon: "📘" },
  { name: "Node.js", level: 75, icon: "🟢" },
  { name: "Tailwind CSS", level: 90, icon: "🎨" },
  { name: "MongoDB", level: 70, icon: "🍃" },
]

const defaultEducation: Education[] = [
  {
    id: "1",
    degree: "12th - Computer Technology",
    institution: "Deogiri College - MCVC",
    year: "2022",
    description: "Completed higher secondary education with focus on computer technology and programming fundamentals.",
  },
  {
    id: "2",
    degree: "Bachelor of Science in Information Technology (B.Sc. IT)",
    institution: "Deogiri College, Chhatrapati Sambhajinagar",
    year: "June 2026",
    description:
      "Successfully completed my Bachelor of Science in Information Technology with a CGPA of 7.1/10. Developed strong skills in software engineering, full-stack web development, and problem-solving through hands-on practical projects.",
  },
]

const defaultProjects: Project[] = [
  {
    id: "1",
    title: "E-Commerce Platform",
    description:
      "A full-stack e-commerce solution built with Next.js, featuring user authentication, payment integration, and admin dashboard.",
    image: "/modern-ecommerce-website.png",
    technologies: ["Next.js", "React", "MongoDB", "Stripe", "Tailwind CSS"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/jaykamble009/ecommerce",
  },
  {
    id: "2",
    title: "Task Management App",
    description:
      "A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.",
    image: "/task-management-dashboard.png",
    technologies: ["React", "Node.js", "Socket.io", "PostgreSQL", "Material-UI"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/jaykamble009/taskmanager",
  },
]

const defaultContactInfo: ContactInfo = {
  email: "jk365242@gmail.com",
  phone: "+91 9561274934",
  location: "Aurangabad, Maharashtra",
}

// Content management functions
export function getHeroContent(): HeroContent {
  if (typeof window === "undefined") return defaultHeroContent
  const stored = localStorage.getItem("heroContent")
  return stored ? JSON.parse(stored) : defaultHeroContent
}

export function saveHeroContent(content: HeroContent): void {
  localStorage.setItem("heroContent", JSON.stringify(content))
  window.dispatchEvent(new CustomEvent("contentUpdated", { detail: { type: "hero" } }))
}

export function getAboutContent(): AboutContent {
  if (typeof window === "undefined") return defaultAboutContent
  const stored = localStorage.getItem("aboutContent")
  return stored ? JSON.parse(stored) : defaultAboutContent
}

export function saveAboutContent(content: AboutContent): void {
  localStorage.setItem("aboutContent", JSON.stringify(content))
  window.dispatchEvent(new CustomEvent("contentUpdated", { detail: { type: "about" } }))
}

export function getSkills(): Skill[] {
  if (typeof window === "undefined") return defaultSkills
  const stored = localStorage.getItem("skills")
  return stored ? JSON.parse(stored) : defaultSkills
}

export function saveSkills(skills: Skill[]): void {
  localStorage.setItem("skills", JSON.stringify(skills))
  window.dispatchEvent(new CustomEvent("contentUpdated", { detail: { type: "skills" } }))
}

export function getEducation(): Education[] {
  if (typeof window === "undefined") return defaultEducation
  const stored = localStorage.getItem("education")
  return stored ? JSON.parse(stored) : defaultEducation
}

export function saveEducation(education: Education[]): void {
  localStorage.setItem("education", JSON.stringify(education))
  window.dispatchEvent(new CustomEvent("contentUpdated", { detail: { type: "education" } }))
}

export function getProjects(): Project[] {
  if (typeof window === "undefined") return defaultProjects
  const stored = localStorage.getItem("projects")
  return stored ? JSON.parse(stored) : defaultProjects
}

export function saveProjects(projects: Project[]): void {
  localStorage.setItem("projects", JSON.stringify(projects))
  window.dispatchEvent(new CustomEvent("contentUpdated", { detail: { type: "projects" } }))
}

export function getContactInfo(): ContactInfo {
  if (typeof window === "undefined") return defaultContactInfo
  const stored = localStorage.getItem("contactInfo")
  return stored ? JSON.parse(stored) : defaultContactInfo
}

export function saveContactInfo(info: ContactInfo): void {
  localStorage.setItem("contactInfo", JSON.stringify(info))
  window.dispatchEvent(new CustomEvent("contentUpdated", { detail: { type: "contact" } }))
}
