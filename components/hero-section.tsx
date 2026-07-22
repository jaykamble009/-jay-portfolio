'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowDown, Download, Sparkles } from "lucide-react"
import { motion } from "framer-motion"
import { TextScramble } from "@/components/text-scramble"
import { DeveloperWorkspace } from "./developer-workspace"
import heroData from "@/data/hero.json"

export function HeroSection() {
  const [heroContent] = useState(heroData)

  const scrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section id="home" className="min-h-screen pt-24 pb-16 flex items-center relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/4 left-1/4 w-[550px] h-[550px] bg-primary/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[550px] h-[550px] bg-secondary/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-12 items-center">
          
          {/* Left Column: Clean Minimal Recruiter Intro */}
          <div className="text-left space-y-6 sm:space-y-8">
            
            {/* Open to Work Badge */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="inline-flex items-center gap-2.5 rounded-full border border-green-500/30 bg-green-500/10 px-4 py-1.5 text-xs font-bold text-green-400 backdrop-blur-md shadow-sm">
                <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                <span>Open To Work • Full Stack Developer</span>
              </div>
            </motion.div>

            {/* Avatar */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, type: "spring" }}
              className="relative w-24 h-24 sm:w-28 sm:h-28"
            >
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary via-accent to-purple-500 blur-md opacity-70 animate-pulse" />
              <img 
                src="https://github.com/jaykamble009.png" 
                alt="Jay Kamble Full Stack Developer" 
                className="relative w-full h-full rounded-full object-cover border-2 border-background z-10 shadow-2xl"
              />
            </motion.div>

            {/* Name & Title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="space-y-2"
            >
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight">
                <TextScramble 
                  text={heroContent.name} 
                  className="bg-gradient-to-r from-primary via-accent to-purple-400 bg-clip-text text-transparent" 
                />
              </h1>
              <p className="text-xl sm:text-2xl font-bold text-foreground flex items-center gap-2 pt-1">
                <Sparkles className="h-5 w-5 text-primary" />
                <span>Full Stack Developer</span>
              </p>
            </motion.div>

            {/* Short Professional Introduction */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <p className="text-base sm:text-lg text-muted-foreground max-w-xl leading-relaxed">
                Full Stack Developer specializing in building high-performance web applications, AI SaaS tools, and scalable EdTech portals.
              </p>
            </motion.div>

            {/* Primary Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap gap-4 items-center pt-2"
            >
              <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-7 h-12 rounded-xl shadow-lg shadow-primary/25"
                >
                  <Download className="mr-2 h-4.5 w-4.5" /> Download Resume
                </Button>
              </a>

              <Button
                variant="outline"
                size="lg"
                className="font-semibold px-7 h-12 rounded-xl border-white/10 hover:bg-white/10 text-foreground"
                onClick={scrollToProjects}
              >
                View Projects
              </Button>
            </motion.div>

          </div>

          {/* Right Column: Developer Workspace Mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full h-full pt-8 lg:pt-0"
          >
            <DeveloperWorkspace />
          </motion.div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-4 left-1/2 -translate-x-1/2 animate-bounce hidden sm:block"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
      >
        <ArrowDown className="h-6 w-6 text-muted-foreground" />
      </motion.div>
    </section>
  )
}
