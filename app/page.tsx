import { GlowingOrb } from "@/components/glowing-orb"
import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { ProjectsSection } from "@/components/projects-section"
import { GithubDashboard } from "@/components/github-dashboard"
import { SkillsSection } from "@/components/skills-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
import { AIAssistantWidget } from "@/components/ai-assistant-widget"

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

