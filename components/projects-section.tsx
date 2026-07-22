'use client'

import { motion } from "framer-motion"
import { ExternalLink, Github, ArrowUpRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import projectsData from "@/data/projects.json"
import { Button } from "@/components/ui/button"

function ProjectCard({ project, index }: { project: any, index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="group relative flex flex-col min-h-[450px] h-full rounded-3xl bg-card/40 backdrop-blur-xl border border-white/10 overflow-hidden hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 hover:-translate-y-1 p-6"
    >
      {/* Top Image Thumbnail (170px) */}
      <div className="relative w-full h-[170px] rounded-2xl overflow-hidden mb-4 shrink-0 bg-secondary/20 border border-white/5">
        <Image
          src={project.coverImage || "/placeholder.svg"}
          alt={project.title}
          fill
          className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity" />
        
        {/* Status Badge */}
        <div className="absolute top-3 right-3 px-2.5 py-1 bg-background/80 backdrop-blur-md border border-white/10 rounded-full flex items-center gap-1.5 shadow-sm">
          <span className={`w-1.5 h-1.5 rounded-full ${project.status?.toLowerCase() === 'live' ? 'bg-green-400 animate-pulse' : 'bg-amber-400'}`} />
          <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{project.status || 'Live'}</span>
        </div>

        {/* Category Pill */}
        <div className="absolute bottom-3 left-3 px-2.5 py-1 bg-black/60 backdrop-blur-md border border-white/10 rounded-full">
          <span className="text-[10px] font-medium text-white/90">{project.category}</span>
        </div>
      </div>

      {/* Main Card Content */}
      <div className="flex flex-col flex-1 justify-between gap-4">
        <div>
          {/* Title */}
          <h3 className="text-lg sm:text-xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors line-clamp-1 mb-2">
            {project.title}
          </h3>

          {/* Description clamped to 2 lines */}
          <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2 leading-relaxed mb-3">
            {project.description}
          </p>

          {/* Feature Chips */}
          <div className="flex flex-wrap gap-1.5 mb-3">
            {project.features?.slice(0, 3).map((feature: string, i: number) => (
              <span 
                key={i} 
                className="px-2.5 py-0.5 rounded-md text-[10px] font-medium bg-white/5 border border-white/10 text-foreground/80"
              >
                {feature}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom Section: Tech Badges & Action Buttons */}
        <div className="pt-3 border-t border-white/5 space-y-3 mt-auto">
          {/* Tech Badges */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider mr-1">Tech:</span>
            {project.techStack?.slice(0, 3).map((tech: string, i: number) => (
              <span key={i} className="px-2 py-0.5 rounded text-[10px] font-medium bg-primary/10 text-primary border border-primary/20">
                {tech}
              </span>
            ))}
          </div>

          {/* 3 Action Buttons in a Single Row */}
          <div className="flex items-center gap-2 pt-1">
            {project.liveDemo && project.liveDemo !== "#" ? (
              <Button asChild size="sm" className="flex-1 text-xs h-9 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold border border-primary/40 shadow-sm px-2">
                <a href={project.liveDemo} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-1">
                  <span>Live</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </Button>
            ) : (
              <Button disabled size="sm" variant="outline" className="flex-1 text-xs h-9 rounded-xl border-white/10 opacity-50 cursor-not-allowed px-2">
                <span>Soon</span>
              </Button>
            )}

            {project.github && project.github !== "#" && (
              <Button asChild size="sm" variant="outline" className="flex-1 text-xs h-9 rounded-xl bg-white/10 hover:bg-white/20 text-foreground font-bold border border-white/20 px-2">
                <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-1">
                  <Github className="w-3.5 h-3.5" />
                  <span>Code</span>
                </a>
              </Button>
            )}

            <Button asChild size="sm" className="flex-1 text-xs h-9 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold shadow-md shadow-primary/20 px-2">
              <Link href={`/projects/${project.id}`} className="flex items-center justify-center gap-1">
                <span>Details</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export function ProjectsSection() {
  return (
    <section id="projects" className="py-24 scroll-mt-24 relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-1/4 left-0 w-[450px] h-[450px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-[450px] h-[450px] bg-secondary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div
          className="mb-14 text-center max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-3">
            Featured <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-secondary">Projects</span>
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
            Real-world full stack applications and AI SaaS tools built with React, Next.js, and TypeScript.
          </p>
        </motion.div>

        {/* Normal Balanced Projects Grid (3 cols desktop, 2 cols tablet, 1 col mobile) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {projectsData.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

      </div>
    </section>
  )
}
