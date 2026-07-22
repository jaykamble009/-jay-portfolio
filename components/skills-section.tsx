'use client'

import { useState, useRef } from "react"
import { motion, useMotionTemplate, useMotionValue, useSpring, AnimatePresence } from "framer-motion"
import { Layout, Server, Database, Code2, BarChart3, Wrench, Bot, Rocket, Search, CheckCircle2 } from "lucide-react"
import skillsData from "@/data/skills.json"
import { cn } from "@/lib/utils"

const iconMap: Record<string, React.ElementType> = {
  Layout, Server, Database, Code2, BarChart3, Wrench, Bot, Rocket
}

const highlightSkills = ["React.js", "Next.js", "TypeScript", "JavaScript", "Node.js", "Express.js", "PostgreSQL", "Firebase", "Supabase", "Tailwind CSS", "Git", "GitHub"]

function SkillBadge({ name, desc }: { name: string, desc: string }) {
  const isHighlighted = highlightSkills.some(s => s.toLowerCase() === name.toLowerCase())
  return (
    <div className="relative group/badge inline-block">
      <button 
        className={cn(
          "px-3 py-1.5 text-sm font-medium rounded-lg transition-all duration-300 active:scale-95 cursor-default focus:outline-none focus:ring-2 focus:ring-primary/50",
          isHighlighted 
            ? "bg-primary/10 text-primary border border-primary/30 shadow-[0_0_10px_rgba(var(--primary),0.1)]"
            : "bg-white/5 text-muted-foreground border border-white/5 hover:bg-primary/5 hover:text-foreground hover:border-primary/20"
        )}
        aria-label={name}
      >
        {name}
      </button>
      
      {/* Tooltip */}
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-3 bg-background/95 backdrop-blur-xl border border-white/10 rounded-xl text-xs text-center text-foreground opacity-0 group-hover/badge:opacity-100 transition-opacity duration-200 pointer-events-none z-50 shadow-2xl">
        {desc}
        <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-white/10" />
      </div>
    </div>
  )
}

function CategoryCard({ category, index }: { category: any, index: number }) {
  const Icon = iconMap[category.icon] || Layout
  const boundingRef = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const mouseXSpring = useSpring(mouseX)
  const mouseYSpring = useSpring(mouseY)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!boundingRef.current) return
    const rect = boundingRef.current.getBoundingClientRect()
    mouseX.set(e.clientX - rect.left)
    mouseY.set(e.clientY - rect.top)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="h-full"
    >
      <div
        ref={boundingRef}
        onMouseMove={handleMouseMove}
        className="group relative h-full flex flex-col rounded-3xl bg-card/40 backdrop-blur-xl border border-white/10 overflow-visible hover:border-white/30 transition-all duration-500 shadow-2xl p-8"
      >
        <motion.div
          className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-300 group-hover:opacity-100 z-0"
          style={{
            background: useMotionTemplate`
              radial-gradient(
                400px circle at ${mouseXSpring}px ${mouseYSpring}px,
                rgba(255,255,255,0.06),
                transparent 40%
              )
            `,
          }}
        />
        <div className="relative z-10 flex flex-col h-full">
          <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 shadow-inner group-hover:scale-110 group-hover:bg-primary/10 group-hover:border-primary/20 transition-all duration-300 shrink-0">
            <Icon className="w-6 h-6 text-foreground group-hover:text-primary transition-colors" />
          </div>
          <h3 className="text-xl font-bold text-foreground mb-6">{category.title}</h3>
          <div className="flex flex-wrap gap-2 mt-auto">
            {category.skills.map((skill: any, idx: number) => (
              <SkillBadge key={idx} name={skill.name} desc={skill.desc} />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export function SkillsSection() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeFilter, setActiveFilter] = useState("All")

  // Derive categories and filters
  const allCategories = ["All", ...skillsData.categories.map(c => c.title)]
  
  // Filter logic
  const filteredCategories = skillsData.categories.map(category => {
    // If a filter is active, only show that category
    if (activeFilter !== "All" && category.title !== activeFilter) return null
    
    // Search within skills
    const matchingSkills = category.skills.filter((skill: any) => 
      skill.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      skill.desc.toLowerCase().includes(searchQuery.toLowerCase())
    )
    
    // If we have a search query, only show categories that have matching skills
    if (searchQuery && matchingSkills.length === 0) return null
    
    return {
      ...category,
      skills: searchQuery ? matchingSkills : category.skills
    }
  }).filter(Boolean)

  const LearningIcon = iconMap[skillsData.learning.icon] || Rocket

  return (
    <section id="skills" className="py-24 relative min-h-screen">
      {/* Background Accents */}
      <div className="absolute top-40 right-20 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-20 left-20 w-[300px] h-[300px] bg-accent/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <motion.div
          className="mb-16 text-center max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Skills & <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-secondary">Technologies</span>
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Technologies, tools, and platforms I use to build modern web applications, AI-powered solutions, and data-driven software.
          </p>
        </motion.div>

        {/* Featured Skills Bar */}
        <motion.div 
          className="mb-16 flex flex-wrap justify-center gap-3"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {skillsData.featured.map((skill, idx) => (
            <div key={idx} className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary font-semibold text-sm shadow-lg shadow-primary/5 hover:scale-105 transition-transform cursor-default">
              <CheckCircle2 className="w-4 h-4" />
              {skill}
            </div>
          ))}
        </motion.div>

        {/* Controls: Search & Filter */}
        <div className="mb-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search skills, tools, or descriptions..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-background/50 border border-white/10 rounded-2xl pl-12 pr-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all backdrop-blur-sm"
            />
          </div>
          
          <div className="flex overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-hide gap-2 mask-linear-fade">
            {allCategories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={cn(
                  "px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all duration-300",
                  activeFilter === cat 
                    ? "bg-foreground text-background shadow-md" 
                    : "bg-white/5 text-muted-foreground hover:bg-white/10 hover:text-foreground border border-white/5"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Currently Learning Highlight Card (Only show if no search/filter to keep layout clean) */}
        <AnimatePresence>
          {searchQuery === "" && activeFilter === "All" && (
            <motion.div
              initial={{ opacity: 0, height: 0, mb: 0 }}
              animate={{ opacity: 1, height: "auto", mb: 32 }}
              exit={{ opacity: 0, height: 0, mb: 0 }}
              className="overflow-hidden"
            >
              <div className="w-full rounded-3xl bg-gradient-to-r from-primary/10 via-accent/5 to-transparent border border-primary/20 p-8 sm:p-10 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px] group-hover:bg-primary/20 transition-colors duration-500 pointer-events-none" />
                <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start md:items-center">
                  <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center shrink-0 border border-primary/30 text-primary">
                    <LearningIcon className="w-8 h-8" />
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-2xl font-bold text-foreground mb-2">{skillsData.learning.title}</h3>
                    <p className="text-muted-foreground mb-4">{skillsData.learning.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {skillsData.learning.skills.map((skill, idx) => (
                        <span key={idx} className="px-3 py-1.5 text-sm font-medium bg-background/50 text-foreground border border-white/10 rounded-lg shadow-sm">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 min-h-[400px]">
          <AnimatePresence mode="popLayout">
            {filteredCategories.length > 0 ? (
              filteredCategories.map((category: any, index: number) => (
                <CategoryCard key={category.id} category={category} index={index} />
              ))
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="col-span-full flex flex-col items-center justify-center py-20 text-center"
              >
                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
                  <Search className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">No skills found</h3>
                <p className="text-muted-foreground">Try adjusting your search query or filter.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  )
}
