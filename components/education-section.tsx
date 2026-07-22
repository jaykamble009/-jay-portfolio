'use client'

import { motion } from "framer-motion"
import { GraduationCap, Award, CheckCircle2 } from "lucide-react"

export function EducationSection() {
  return (
    <section id="education" className="py-16 md:py-20 relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-primary/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-[700px] mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Header */}
        <motion.div
          className="mb-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-wider mb-3">
            <GraduationCap className="w-4 h-4" />
            <span>Education</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">
            Academic Background
          </h2>
        </motion.div>

        {/* Compact Glassmorphism Education Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="group relative rounded-3xl bg-card/40 backdrop-blur-xl border border-white/10 p-6 sm:p-7 shadow-2xl overflow-hidden hover:border-primary/30 transition-all duration-300 hover:shadow-primary/5"
        >
          {/* Top Status & Degree */}
          <div className="flex flex-wrap items-start justify-between gap-3 mb-4 pb-4 border-b border-white/10">
            <div>
              <span className="text-xs font-bold text-primary uppercase tracking-wider block mb-1">
                Degree Program
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                Bachelor of Science in Information Technology
              </h3>
            </div>

            <div className="px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-semibold shrink-0">
              Graduated • June 2026
            </div>
          </div>

          {/* Institutions */}
          <div className="space-y-1 mb-5">
            <p className="text-sm font-semibold text-foreground/90">
              Deogiri College
            </p>
            <p className="text-xs text-muted-foreground">
              Dr. Babasaheb Ambedkar Marathwada University
            </p>
          </div>

          {/* Key Metrics & Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4 border-t border-white/10">
            <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/10 text-center sm:text-left">
              <span className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider block mb-0.5">
                Academic Score
              </span>
              <span className="text-sm font-bold text-primary">
                CGPA • 7.1 / 10
              </span>
            </div>

            <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/10 text-center sm:text-left">
              <span className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider block mb-0.5">
                Certification
              </span>
              <span className="text-sm font-bold text-foreground flex items-center justify-center sm:justify-start gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-green-400 shrink-0" />
                MSCIT Certified
              </span>
            </div>

            <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/10 text-center sm:text-left col-span-2 sm:col-span-1">
              <span className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider block mb-0.5">
                Higher Secondary
              </span>
              <span className="text-sm font-bold text-foreground">
                12th MCVC • 73.83%
              </span>
            </div>
          </div>

        </motion.div>

      </div>
    </section>
  )
}
