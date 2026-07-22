'use client'

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  Github, 
  Linkedin, 
  Mail, 
  Download, 
  Terminal, 
  Code2, 
  Target, 
  Rocket, 
  Sparkles,
  ArrowRight,
  Heart,
  Quote
} from "lucide-react"
import Link from "next/link"
import aboutData from "@/data/about.json"
import { Button } from "@/components/ui/button"
import { TypewriterText } from "@/components/typewriter-text"

import { useState } from 'react'

export function AboutSection() {
  const [showJourney, setShowJourney] = useState(false)

  return (
    <section id="about" className="py-24 scroll-mt-24 relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-40 left-0 w-72 h-72 bg-primary/10 rounded-full blur-[100px]" />
      <div className="absolute bottom-40 right-0 w-72 h-72 bg-secondary/10 rounded-full blur-[100px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div
          className="mb-16 text-center lg:text-left"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            <span className="text-primary">About</span> Me
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto lg:mx-0">
            Get to know who I am, what motivates me, and why I love building software.
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent rounded-full mt-6 mx-auto lg:mx-0" />
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* LEFT SIDE: Sticky Profile Card */}
          <div className="lg:col-span-4 relative">
            <div className="sticky top-24 space-y-6">
              {/* Profile Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="relative rounded-3xl overflow-hidden bg-background/40 backdrop-blur-xl border border-white/10 shadow-2xl group p-1"
              >
                {/* Animated gradient border effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/20 to-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative bg-card/80 backdrop-blur-sm rounded-[22px] p-8 flex flex-col items-center text-center h-full">
                  
                  {/* Open to Work Badge */}
                  <div className="absolute top-4 right-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-xs font-semibold text-green-400">Open to Work</span>
                  </div>

                  {/* Avatar / Developer Illustration */}
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 border-4 border-background flex items-center justify-center mb-6 shadow-xl relative overflow-hidden mt-4">
                    <Terminal className="w-12 h-12 text-primary" />
                    {/* Floating icons around avatar */}
                    <Code2 className="absolute top-4 left-4 w-4 h-4 text-secondary opacity-50" />
                    <Sparkles className="absolute bottom-6 right-4 w-4 h-4 text-accent opacity-50" />
                  </div>

                  <h3 className="text-2xl font-bold text-foreground mb-2">{aboutData.profile.name}</h3>
                  <p className="text-sm text-primary font-medium mb-8 leading-relaxed">
                    {aboutData.profile.tagline}
                  </p>

                  <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-8" />

                  {/* Resume Button */}
                  <Button asChild className="w-full rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-lg shadow-primary/25 mb-6 group">
                    <a href={aboutData.profile.resumeLink} download>
                      Download Resume
                      <Download className="w-4 h-4 ml-2 group-hover:-translate-y-1 transition-transform" />
                    </a>
                  </Button>

                  {/* Social Icons */}
                  <div className="flex gap-4">
                    <a href={aboutData.profile.social.github} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-white/10 hover:border-white/20 transition-all hover:scale-110">
                      <Github className="w-4 h-4" />
                    </a>
                    <a href={aboutData.profile.social.linkedin} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-white/10 hover:border-white/20 transition-all hover:scale-110">
                      <Linkedin className="w-4 h-4" />
                    </a>
                    <a href={`mailto:${aboutData.profile.social.email}`} className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-white/10 hover:border-white/20 transition-all hover:scale-110">
                      <Mail className="w-4 h-4" />
                    </a>
                  </div>

                </div>
              </motion.div>

              {/* Education Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="rounded-3xl bg-card/40 backdrop-blur-xl border border-white/10 p-5 shadow-xl text-left hover:border-primary/30 transition-colors"
              >
                <div className="flex items-center gap-2.5 mb-3">
                  <div className="w-8 h-8 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary text-sm font-bold">
                    🎓
                  </div>
                  <div>
                    <span className="text-[10px] font-semibold text-primary uppercase tracking-wider block">Education</span>
                    <h4 className="text-xs font-bold text-foreground">B.Sc. Information Technology</h4>
                  </div>
                </div>

                <div className="space-y-1.5 text-xs text-muted-foreground border-t border-white/5 pt-2.5">
                  <p className="font-semibold text-foreground/90">Deogiri College</p>
                  <p className="text-[11px] text-muted-foreground">Dr. Babasaheb Ambedkar Marathwada Univ.</p>
                  <div className="flex items-center justify-between text-[11px] pt-1 border-t border-white/5">
                    <span className="text-green-400 font-semibold">Graduated • June 2026</span>
                    <span className="text-primary font-bold">CGPA 7.1 / 10</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* RIGHT SIDE: Content Sections */}
          <div className="lg:col-span-8 space-y-16">
            
            {/* Introduction */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="space-y-4"
            >
              <h3 className="text-2xl font-bold flex items-center gap-2 text-foreground">
                <span className="text-2xl">👋</span> Introduction
              </h3>
              <div className="prose prose-invert max-w-none text-lg text-muted-foreground leading-relaxed min-h-[4rem]">
                <p>
                  <TypewriterText 
                    text={aboutData.introduction} 
                    delay={0.2} 
                    speed={15} 
                    highlightKeywords={["Full Stack Developer", "scalable SaaS products", "clean code", "intuitive user experiences", "continuous learning", "fast", "scalable", "user-friendly"]}
                    onComplete={() => {
                      setTimeout(() => {
                        setShowJourney(true)
                      }, 600)
                    }}
                  />
                </p>
              </div>
            </motion.div>

            {/* My Journey */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={showJourney ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
              className="space-y-4"
            >
              <h3 className="text-2xl font-bold flex items-center gap-2 text-foreground">
                <Rocket className="w-6 h-6 text-accent" /> My Journey
              </h3>
              <div className="prose prose-invert max-w-none text-lg text-muted-foreground leading-relaxed min-h-[8rem]">
                <p>
                  <TypewriterText 
                    text={aboutData.journey} 
                    delay={0.2} 
                    speed={15} 
                    startTypingProp={showJourney}
                    highlightKeywords={["B.Sc. in Information Technology", "practical applications", "seamless digital experiences", "Computer Technology"]}
                  />
                </p>
              </div>
            </motion.div>









            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="pt-8 border-t border-white/10"
            >
              <div className="bg-card/30 rounded-3xl p-8 border border-white/5 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-8 backdrop-blur-sm shadow-xl">
                <div className="max-w-md">
                  <h4 className="text-xl font-bold text-foreground mb-2">{aboutData.ctaTitle || "Available for Full-Time Roles & Projects"}</h4>
                  <p className="text-sm text-muted-foreground">{aboutData.cta}</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 shrink-0 w-full sm:w-auto">
                  <Button asChild className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl shadow-lg shadow-primary/25">
                    <Link href="#projects">
                      View Projects
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="w-full sm:w-auto rounded-xl border-white/10 hover:bg-white/5">
                    <Link href="#contact">Contact Me</Link>
                  </Button>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  )
}
