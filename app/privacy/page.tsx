'use client'

import { motion, useScroll, useSpring } from "framer-motion"
import { ArrowUp, ChevronLeft } from "lucide-react"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"

const sections = [
  { id: "introduction", title: "Introduction" },
  { id: "information-collected", title: "Information Collected" },
  { id: "purpose", title: "Purpose of Data Collection" },
  { id: "third-party", title: "Third-Party Services" },
  { id: "cookies", title: "Cookies" },
  { id: "security", title: "Data Security" },
  { id: "sharing", title: "Data Sharing" },
  { id: "rights", title: "User Rights" },
  { id: "contact", title: "Contact" }
]

export default function PrivacyPolicy() {
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
            Privacy Policy
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
              
              <section id="introduction" className="scroll-mt-32">
                <h2 className="text-2xl font-bold mb-4">Introduction</h2>
                <p>This portfolio is a personal website created to showcase my work, projects, skills, and professional experience.</p>
                <p>I respect visitors' privacy and only collect the minimum information necessary to ensure the proper functioning of this website and to facilitate communication.</p>
              </section>

              <section id="information-collected" className="scroll-mt-32">
                <h2 className="text-2xl font-bold mb-4">Information Collected</h2>
                <p>When you use this website, we may collect the following information:</p>
                <ul className="list-disc pl-6 space-y-2 mt-4 text-muted-foreground">
                  <li>Name (when submitted via the contact form)</li>
                  <li>Email Address (when submitted via the contact form)</li>
                  <li>Messages submitted through the contact form</li>
                </ul>
                <p className="mt-4 font-medium text-foreground">No sensitive personal information is intentionally collected.</p>
              </section>

              <section id="purpose" className="scroll-mt-32">
                <h2 className="text-2xl font-bold mb-4">Purpose of Data Collection</h2>
                <p>The collected information is used exclusively to:</p>
                <ul className="list-disc pl-6 space-y-2 mt-4 text-muted-foreground">
                  <li>Respond to your inquiries</li>
                  <li>Communicate regarding professional opportunities</li>
                  <li>Improve the overall website experience</li>
                  <li>Prevent spam submissions and abuse</li>
                </ul>
              </section>

              <section id="third-party" className="scroll-mt-32">
                <h2 className="text-2xl font-bold mb-4">Third-Party Services</h2>
                <p>This website utilizes various third-party services to function efficiently, which may include:</p>
                <ul className="list-disc pl-6 space-y-2 mt-4 text-muted-foreground">
                  <li><strong>Vercel:</strong> For hosting and deployment.</li>
                  <li><strong>Analytics:</strong> Google Analytics or Vercel Analytics for website performance insights.</li>
                  <li><strong>Email Services:</strong> Third-party providers for handling contact form submissions.</li>
                  <li><strong>GitHub API:</strong> For fetching real-time repository data.</li>
                  <li><strong>Supabase:</strong> For backend database storage.</li>
                </ul>
                <p className="mt-4">Please note that these services may process technical information (such as your IP address and browser type) according to their own privacy policies.</p>
              </section>

              <section id="cookies" className="scroll-mt-32">
                <h2 className="text-2xl font-bold mb-4">Cookies</h2>
                <p>This website may use essential cookies to ensure standard functionality and analytics cookies to improve performance and user experience. You can choose to disable cookies through your browser settings, though this may affect how the website functions.</p>
              </section>

              <section id="security" className="scroll-mt-32">
                <h2 className="text-2xl font-bold mb-4">Data Security</h2>
                <p>I employ reasonable and industry-standard security measures to protect any information submitted through this website against unauthorized access, alteration, disclosure, or destruction.</p>
              </section>

              <section id="sharing" className="scroll-mt-32">
                <h2 className="text-2xl font-bold mb-4">Data Sharing</h2>
                <div className="p-4 border-l-4 border-primary bg-primary/5 rounded-r-lg">
                  <p className="font-semibold text-foreground m-0">"I do not sell, rent, or trade personal information with third parties."</p>
                </div>
              </section>

              <section id="rights" className="scroll-mt-32">
                <h2 className="text-2xl font-bold mb-4">User Rights</h2>
                <p>As a visitor, you have the right to request:</p>
                <ul className="list-disc pl-6 space-y-2 mt-4 text-muted-foreground">
                  <li>Access to your submitted information</li>
                  <li>Correction of any inaccurate information</li>
                  <li>Deletion of your submitted information</li>
                </ul>
                <p className="mt-4">To exercise these rights, please contact me using the email address provided below.</p>
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
