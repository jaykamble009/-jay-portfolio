'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { ChevronLeft, ExternalLink, Github, Monitor, Globe, Server, Database, Lock, Box, CheckCircle2, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { MagneticButton } from '@/components/magnetic-button'
import { ImageWithFallback } from '@/components/ui/image-with-fallback'

// Types based on the updated projects.json
type Project = any; // Will use any for now to avoid rigid typing during rapid prototyping

export function ProjectCaseStudy({ project }: { project: Project }) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <div className="relative bg-background selection:bg-primary/30 selection:text-primary">
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-secondary origin-left z-50"
        style={{ scaleX }}
      />

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 overflow-hidden border-b border-white/5">
        <div className="absolute inset-0">
          {project.coverImage && (
            <div className="absolute inset-0 opacity-10 blur-3xl pointer-events-none">
              <ImageWithFallback src={project.coverImage} alt="Background" fill className="object-cover" />
            </div>
          )}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/20 blur-[120px] rounded-full pointer-events-none opacity-50" />
        </div>
        
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <Link href="/#projects" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors mb-12 group bg-white/5 border border-white/10 px-4 py-2 rounded-full backdrop-blur-md">
            <ChevronLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Projects
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-bold tracking-widest uppercase mb-6">
              {project.category}
            </div>
            
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 text-foreground">
              {project.title.split('–')[0]}
              <span className="block text-3xl md:text-5xl text-muted-foreground mt-2 font-semibold">
                {project.title.includes('–') ? project.title.split('–')[1] : project.description}
              </span>
            </h1>

            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-10">
              {project.description}
            </p>

            <div className="flex flex-wrap justify-center items-center gap-4">
              {project.liveDemo && (
                <MagneticButton>
                  <Button asChild size="lg" className="rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 shadow-lg shadow-primary/25">
                    <a href={project.liveDemo} target="_blank" rel="noopener noreferrer">
                      Live Demo <ExternalLink className="w-4 h-4 ml-2" />
                    </a>
                  </Button>
                </MagneticButton>
              )}
              {project.github && (
                <MagneticButton>
                  <Button asChild variant="outline" size="lg" className="rounded-xl border-white/10 hover:bg-white/5 px-8">
                    <a href={project.github} target="_blank" rel="noopener noreferrer">
                      <Github className="w-4 h-4 mr-2" /> Source Code
                    </a>
                  </Button>
                </MagneticButton>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content Area with Sticky Nav */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 flex flex-col lg:flex-row gap-16">
        
        {/* Sticky Table of Contents (Desktop) */}
        <div className="hidden lg:block w-64 shrink-0">
          <div className="sticky top-32 flex flex-col gap-2 border-l border-white/10 pl-6">
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-4">Contents</span>
            {['Overview', 'Architecture', 'Challenges & Solutions', 'Tech Stack', 'Statistics'].map((item, i) => (
              <a key={i} href={`#${item.toLowerCase().replace(/ /g, '-')}`} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-1.5">
                {item}
              </a>
            ))}
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 space-y-32">
          
          {/* Overview */}
          <section id="overview" className="scroll-mt-32">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <span className="w-8 h-px bg-primary" /> Overview
            </h2>
            <div className="prose prose-invert prose-lg max-w-none text-muted-foreground leading-relaxed">
              <p>{project.overview}</p>
            </div>
          </section>

          {/* Gallery */}
          {project.gallery?.filter((img: string) => img !== '/placeholder.svg').length > 0 && (
            <section id="gallery">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {project.gallery.filter((img: string) => img !== '/placeholder.svg').map((img: string, i: number) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className={`rounded-2xl overflow-hidden border border-white/5 bg-white/5 aspect-video relative group ${i === 0 ? 'md:col-span-2' : ''}`}
                  >
                    <ImageWithFallback
                      src={img}
                      alt={`${project.title} Screenshot ${i + 1}`}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </motion.div>
                ))}
              </div>
            </section>
          )}

          {/* Architecture Timeline */}
          <section id="architecture" className="scroll-mt-32">
            <h2 className="text-3xl font-bold mb-10 flex items-center gap-3">
              <span className="w-8 h-px bg-primary" /> System Architecture
            </h2>
            <div className="relative p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <div className="absolute top-1/2 left-8 right-8 h-0.5 bg-white/10 -translate-y-1/2 hidden md:block" />
              <div className="grid grid-cols-1 md:grid-cols-5 gap-8 relative z-10">
                {project.architectureTimeline?.map((item: any, i: number) => (
                  <div key={i} className="flex flex-col items-center text-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-background border border-white/20 flex items-center justify-center shadow-xl shadow-black/50 text-primary">
                      <Box className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground text-sm mb-1">{item.step}</h4>
                      <p className="text-xs text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Challenges & Solutions */}
          <section id="challenges-&-solutions" className="scroll-mt-32">
            <h2 className="text-3xl font-bold mb-10 flex items-center gap-3">
              <span className="w-8 h-px bg-primary" /> Challenges & Solutions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {project.challenges?.map((challenge: any, i: number) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="p-8 rounded-3xl bg-white/5 border border-white/10"
                >
                  <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center text-xs">C</span>
                    {challenge.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                    {challenge.description}
                  </p>
                  
                  <div className="h-px w-full bg-white/10 mb-6" />
                  
                  <h3 className="text-lg font-bold text-foreground mb-3 flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center text-xs">S</span>
                    {project.solutions[i]?.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {project.solutions[i]?.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Tech Stack */}
          <section id="tech-stack" className="scroll-mt-32">
            <h2 className="text-3xl font-bold mb-10 flex items-center gap-3">
              <span className="w-8 h-px bg-primary" /> Technology Stack
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {project.techStackDetailed && Object.entries(project.techStackDetailed).map(([category, techList]: [string, any], i: number) => (
                <div key={category} className="p-6 rounded-2xl bg-white/5 border border-white/10">
                  <h4 className="text-sm font-bold text-foreground tracking-widest uppercase mb-4">{category}</h4>
                  <ul className="space-y-3">
                    {techList.map((tech: string, j: number) => (
                      <li key={j} className="flex items-center text-sm text-muted-foreground">
                        <CheckCircle2 className="w-4 h-4 mr-3 text-primary/70" />
                        {tech}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Features */}
          <section id="features" className="scroll-mt-32">
            <h2 className="text-3xl font-bold mb-10 flex items-center gap-3">
              <span className="w-8 h-px bg-primary" /> Key Features
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {project.features?.map((feature: string, i: number) => (
                <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center text-sm font-medium text-foreground">
                  <CheckCircle2 className="w-4 h-4 mr-3 text-primary" />
                  {feature}
                </div>
              ))}
            </div>
          </section>

          {/* Role & Process */}
          <section id="role-&-process" className="scroll-mt-32">
            <h2 className="text-3xl font-bold mb-10 flex items-center gap-3">
              <span className="w-8 h-px bg-primary" /> Role & Process
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-xl font-bold mb-6 text-foreground">{project.role}</h3>
                <ul className="space-y-4">
                  {project.responsibilities?.map((resp: string, i: number) => (
                    <li key={i} className="flex items-start text-muted-foreground">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 mr-3 shrink-0" />
                      <span className="leading-relaxed">{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-6 text-foreground">Development Timeline</h3>
                <div className="flex flex-wrap gap-2">
                  {project.developmentProcess?.map((step: string, i: number) => (
                    <div key={i} className="flex items-center">
                      <div className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-muted-foreground font-medium">
                        {step}
                      </div>
                      {i < project.developmentProcess.length - 1 && (
                        <ArrowRight className="w-4 h-4 mx-2 text-white/20" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Statistics & Performance */}
          <section id="statistics" className="scroll-mt-32">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              <div>
                <h2 className="text-3xl font-bold mb-10 flex items-center gap-3">
                  <span className="w-8 h-px bg-primary" /> Project Metrics
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  {project.statistics?.map((stat: any, i: number) => (
                    <div key={i} className="p-6 rounded-2xl bg-background border border-white/10 flex flex-col items-center justify-center text-center shadow-sm">
                      <span className="text-3xl font-black text-foreground mb-2">{stat.value}</span>
                      <span className="text-xs font-medium tracking-widest text-muted-foreground uppercase">{stat.label}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h2 className="text-3xl font-bold mb-10 flex items-center gap-3">
                  <span className="w-8 h-px bg-primary" /> Performance
                </h2>
                <div className="flex flex-col gap-4">
                  {project.performance?.map((perf: string, i: number) => (
                    <div key={i} className="px-6 py-4 rounded-xl bg-gradient-to-r from-green-500/10 to-transparent border border-green-500/20 flex items-center text-green-400 font-medium">
                      <CheckCircle2 className="w-5 h-5 mr-3 text-green-500" />
                      {perf}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Roadmap */}
          <section id="roadmap" className="scroll-mt-32 pb-32">
            <h2 className="text-3xl font-bold mb-10 flex items-center gap-3">
              <span className="w-8 h-px bg-primary" /> Future Roadmap
            </h2>
            <div className="flex flex-wrap gap-4">
              {project.futureRoadmap?.map((item: string, i: number) => (
                <div key={i} className="px-6 py-3 rounded-full bg-background border border-white/10 text-sm font-medium text-muted-foreground flex items-center">
                  <span className="w-2 h-2 rounded-full bg-white/20 mr-3" />
                  {item}
                </div>
              ))}
            </div>
          </section>

        </div>
      </div>
    </div>
  )
}
