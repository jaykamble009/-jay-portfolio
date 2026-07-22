'use client'

import { Github, Linkedin, Mail, ArrowUp } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer className="border-t border-white/5 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 mb-16">
          
          {/* LEFT SECTION */}
          <div className="flex flex-col space-y-5">
            <span className="text-lg font-bold tracking-tight text-foreground">
              Jay Kamble
            </span>
            <p className="text-muted-foreground text-sm max-w-sm leading-relaxed">
              Full Stack Developer specializing in React, Next.js, TypeScript, AI-powered applications, and modern SaaS products.
            </p>
            <div className="flex items-center gap-2 w-fit px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              <span className="text-xs font-semibold text-green-500 tracking-wide uppercase">
                Open to Work
              </span>
            </div>
          </div>

          {/* CENTER SECTION */}
          <div className="flex flex-col space-y-5 md:items-center">
            <div className="flex flex-col space-y-4">
              <span className="text-sm font-semibold text-foreground">Quick Links</span>
              <ul className="flex flex-col space-y-3">
                <li>
                  <Link href="#about" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#projects" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    Projects
                  </Link>
                </li>
                <li>
                  <Link href="#contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    Contact
                  </Link>
                </li>
                <li>
                  <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    Resume
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* RIGHT SECTION */}
          <div className="flex flex-col space-y-5 md:items-end">
            <div className="flex flex-col space-y-4 md:items-end">
              <span className="text-sm font-semibold text-foreground">Connect</span>
              <ul className="flex flex-col space-y-3 md:items-end">
                <li>
                  <a href="https://github.com/jaykamble009" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group">
                    <span className="md:hidden">GitHub</span>
                    <span className="hidden md:inline">GitHub</span>
                    <Github className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                </li>
                <li>
                  <a href="https://linkedin.com/in/jaykamble" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group">
                    <span className="md:hidden">LinkedIn</span>
                    <span className="hidden md:inline">LinkedIn</span>
                    <Linkedin className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                </li>
                <li>
                  <a href="mailto:jk365242@gmail.com" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group">
                    <span className="md:hidden">Email</span>
                    <span className="hidden md:inline">Email</span>
                    <Mail className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 text-xs text-muted-foreground text-center md:text-left">
            <p>© {new Date().getFullYear()} Jay Kamble. All Rights Reserved.</p>
            <span className="hidden md:inline text-white/20">•</span>
            <p>Built with Next.js • React • TypeScript • Tailwind CSS</p>
            <span className="hidden md:inline text-white/20">•</span>
            <p>Designed & Developed by Jay Kamble ❤️</p>
          </div>
          
          <Button
            onClick={scrollToTop}
            variant="ghost"
            size="sm"
            className="text-muted-foreground hover:text-primary h-8 px-3 rounded-md transition-colors group mt-4 md:mt-0"
            aria-label="Back to top"
          >
            Back to Top
            <ArrowUp className="w-3 h-3 ml-2 group-hover:-translate-y-1 transition-transform" />
          </Button>
        </div>
      </div>
    </footer>
  )
}
