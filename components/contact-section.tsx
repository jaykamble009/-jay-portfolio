'use client'

import { motion } from "framer-motion"
import { Send, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { HighlightText } from "@/components/highlight-text"
import { ContactForm } from "@/components/contact-form"

export function ContactSection() {

  return (
    <section id="contact" className="py-16 scroll-mt-24 relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div
          className="mb-10 text-center max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span className="text-xs font-semibold tracking-wide uppercase">Get In Touch</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            Let's build something <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">amazing</span>
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
            <HighlightText 
              text="I'm currently open for new full-time and freelance opportunities. Whether you want to hire me, collaborate on a project, or just want to say hi, I'll try my best to get back to you!" 
              keywords={["full-time", "freelance", "hire me", "collaborate"]}
            />
          </p>
        </motion.div>

        <div className="max-w-xl mx-auto">
          
          {/* Contact Form */}
          <ContactForm />

        </div>
      </div>
    </section>
  )
}
