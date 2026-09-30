'use client'

import dynamic from "next/dynamic"
import { GlowingOrb } from "@/components/glowing-orb"
import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { ProjectsSection } from "@/components/projects-section"
import { SkillsSection } from "@/components/skills-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"

// Dynamic lazy loading for heavy off-screen widgets to optimize bundle size
const GithubDashboard = dynamic(() => import("@/components/github-dashboard").then(mod => mod.GithubDashboard), {
  ssr: true,
})

const AIAssistantWidget = dynamic(() => import("@/components/ai-assistant-widget").then(mod => mod.AIAssistantWidget), {
  ssr: false,
})

export default function Home() {
  return (
    <main className="relative min-h-screen">
      {/* Glowing orb background animation */}
      <GlowingOrb />

      {/* Navigation */}
      <Navigation />

      {/* Page sections */}
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <GithubDashboard />
      <SkillsSection />
      <ContactSection />

      {/* Floating Portfolio Copilot Widget */}
      <AIAssistantWidget />

      {/* Footer */}
      <Footer />
    </main>
  )
}

