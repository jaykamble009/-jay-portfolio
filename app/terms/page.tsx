'use client'

import { motion, useScroll, useSpring } from "framer-motion"
import { ArrowUp, ChevronLeft } from "lucide-react"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"

const sections = [
  { id: "acceptance", title: "Acceptance of Terms" },
  { id: "purpose", title: "Website Purpose" },
  { id: "intellectual-property", title: "Intellectual Property" },
  { id: "acceptable-use", title: "Acceptable Use" },
  { id: "external-links", title: "External Links" },
  { id: "no-warranty", title: "No Warranty" },
  { id: "liability", title: "Limitation of Liability" },
  { id: "changes", title: "Changes to Terms" },
  { id: "governing-law", title: "Governing Law" },
  { id: "contact", title: "Contact" }
]

export default function TermsAndConditions() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <main className="min-h-screen bg-background relative selection:bg-primary/30 selection:text-primary">
      {/* Scroll Progress Indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-secondary origin-left z-50"
        style={{ scaleX }}
      />

      <Navigation />

      {/* Background Accents */}
      <div className="fixed top-40 left-0 w-96 h-96 bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="fixed bottom-40 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24 relative z-10">
        <div className="mb-12">
          <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors mb-6 group">
            <ChevronLeft className="w-4 h-4 mr-1 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
          <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70 mb-4">
            Terms & Conditions
          </h1>
          <p className="text-muted-foreground">Last Updated: {new Date().toLocaleString('default', { month: 'long', year: 'numeric' })}</p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-start">
          {/* Table of Contents - Sticky Sidebar */}
          <div className="lg:col-span-3 hidden lg:block sticky top-32">
            <nav className="p-6 rounded-2xl bg-background/40 backdrop-blur-xl border border-white/5 shadow-2xl">
              <h4 className="font-semibold text-foreground mb-4 uppercase tracking-wider text-sm">Contents</h4>
              <ul className="space-y-3 text-sm">
                {sections.map((section) => (
                  <li key={section.id}>
                    <button 
                      onClick={() => scrollToSection(section.id)}
                      className="text-muted-foreground hover:text-primary transition-colors text-left w-full"
                    >
                      {section.title}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-9 space-y-12 prose prose-invert max-w-none prose-p:text-muted-foreground prose-headings:text-foreground prose-a:text-primary hover:prose-a:text-primary/80">
            <div className="p-8 md:p-12 rounded-3xl bg-background/40 backdrop-blur-xl border border-white/5 shadow-2xl space-y-12">
              
              <section id="acceptance" className="scroll-mt-32">
                <h2 className="text-2xl font-bold mb-4">Acceptance</h2>
                <p>By accessing and using this website, visitors explicitly agree to abide by these Terms & Conditions. If you do not agree with any part of these terms, please refrain from using the website.</p>
              </section>

              <section id="purpose" className="scroll-mt-32">
                <h2 className="text-2xl font-bold mb-4">Website Purpose</h2>
                <p>This website is intended to:</p>
                <ul className="list-disc pl-6 space-y-2 mt-4 text-muted-foreground">
                  <li>Showcase professional projects and portfolio work</li>
                  <li>Display technical skills and competencies</li>
                  <li>Share professional background and experience</li>
                  <li>Provide a platform for visitors to contact me regarding opportunities</li>
                </ul>
              </section>

              <section id="intellectual-property" className="scroll-mt-32">
                <h2 className="text-2xl font-bold mb-4">Intellectual Property</h2>
                <p>Unless otherwise explicitly stated, all intellectual property rights belong to the website owner. This includes but is not limited to:</p>
                <ul className="list-disc pl-6 space-y-2 mt-4 text-muted-foreground">
                  <li>All original content</li>
                  <li>UI designs and aesthetic layouts</li>
                  <li>Graphics and visual assets</li>
                  <li>Portfolio content and personal branding</li>
                  <li>Project descriptions and case studies</li>
                </ul>
                <p className="mt-4 text-sm text-primary"><em>Note: Open-source projects linked or showcased on this website remain subject to their respective licenses.</em></p>
              </section>

              <section id="acceptable-use" className="scroll-mt-32">
                <h2 className="text-2xl font-bold mb-4">Acceptable Use</h2>
                <p>By using this website, visitors agree not to engage in the following activities:</p>
                <ul className="list-disc pl-6 space-y-2 mt-4 text-muted-foreground">
                  <li>Attempt any form of unauthorized access to the website or its infrastructure</li>
                  <li>Copy, reproduce, or redistribute original content without prior written permission</li>
                  <li>Abuse the contact form for spam, harassment, or solicitation</li>
                  <li>Perform any malicious activities, including reverse engineering or deploying malware against the website</li>
                </ul>
              </section>

              <section id="external-links" className="scroll-mt-32">
                <h2 className="text-2xl font-bold mb-4">External Links</h2>
                <p>The website may contain links to third-party websites for reference, attribution, or convenience. I am not responsible for the content, security, or privacy practices of these external websites. Visiting these links is at your own risk.</p>
              </section>

              <section id="no-warranty" className="scroll-mt-32">
                <h2 className="text-2xl font-bold mb-4">No Warranty</h2>
                <p>This website is provided on an "as is" and "as available" basis without any warranties, expressed or implied, regarding uninterrupted availability, accuracy of information, or error-free operation.</p>
              </section>

              <section id="liability" className="scroll-mt-32">
                <h2 className="text-2xl font-bold mb-4">Limitation of Liability</h2>
                <p>The website owner shall not be held responsible or liable for any direct, indirect, incidental, or consequential damages resulting from the use or inability to use this website, including data loss or business interruption.</p>
              </section>

              <section id="changes" className="scroll-mt-32">
                <h2 className="text-2xl font-bold mb-4">Changes to Terms</h2>
                <p>These Terms & Conditions may be updated periodically to reflect changes in practices, features, or legal requirements without prior notice. Continued use of the website implies acceptance of the revised terms.</p>
              </section>

              <section id="governing-law" className="scroll-mt-32">
                <h2 className="text-2xl font-bold mb-4">Governing Law</h2>
                <p>These Terms & Conditions shall be governed by and construed in accordance with the laws of India, without regard to its conflict of law principles.</p>
              </section>

              <section id="contact" className="scroll-mt-32">
                <h2 className="text-2xl font-bold mb-4">Contact</h2>
                <div className="space-y-2 text-muted-foreground">
                  <p><strong className="text-foreground">Developer:</strong> Jay Kamble</p>
                  <p><strong className="text-foreground">Email:</strong> <a href="mailto:hello@jay.dev">hello@jay.dev</a></p>
                </div>
              </section>

            </div>
          </div>
        </div>
      </div>

      <Footer />

      {/* Back to Top */}
      <Button
        onClick={scrollToTop}
        variant="outline"
        size="icon"
        className="fixed bottom-8 right-8 rounded-full bg-background/80 backdrop-blur-md border-white/10 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300 shadow-2xl z-50"
      >
        <ArrowUp className="w-4 h-4" />
      </Button>
    </main>
  )
}
