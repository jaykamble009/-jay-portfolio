'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bot, Sparkles, X, Send, ChevronRight, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface Message {
  id: string
  sender: 'copilot' | 'user'
  text: string
  timestamp: string
  actions?: { label: string; href: string; isExternal?: boolean }[]
}

const QUICK_ACTIONS = [
  { label: "🚀 View Projects", href: "#projects" },
  { label: "📄 Download Resume", href: "/resume.pdf", isExternal: true },
  { label: "🎓 View Education", href: "#achievements" },
  { label: "📬 Contact Me", href: "#contact" },
  { label: "🐙 Visit GitHub", href: "https://github.com/jaykamble009", isExternal: true }
]

const COPILOT_KNOWLEDGE: Record<string, { answer: string; actions?: { label: string; href: string; isExternal?: boolean }[] }> = {
  "about": {
    answer: "Jay Kamble is a Full Stack Developer based in Chhatrapati Sambhajinagar, Maharashtra, India. He graduated with a B.Sc. in Information Technology from Deogiri College (Dr. BAMU) with a CGPA of 7.1/10.",
    actions: [{ label: "View About Section", href: "#about" }]
  },
  "projects": {
    answer: "Jay has built 4 production-ready SaaS applications:\n1. PDFino (AI PDF Utility Suite - Next.js & Web Workers)\n2. Next Class Quiz (EdTech Exam Portal - Firebase 500+ users)\n3. EventHub (Full Stack Event Ticketing - MERN Stack)\n4. CHRBo (Restaurant POS & Digital Menu SaaS - PostgreSQL & WebSockets)",
    actions: [{ label: "Explore Projects Showcase", href: "#technical-showcase" }]
  },
  "skills": {
    answer: "Jay's primary technology stack includes:\n• Frontend: React 18, Next.js 14, TypeScript, Tailwind CSS, Framer Motion\n• Backend: Node.js, Express.js, REST & GraphQL APIs, WebSockets\n• Database: PostgreSQL, Supabase, MongoDB, Firebase Firestore",
    actions: [{ label: "View All Skills", href: "#skills" }]
  },
  "experience": {
    answer: "Jay has completed his B.Sc. IT degree (2026), built 4 production SaaS platforms, contributed 1,200+ commits on GitHub, and holds MSCIT and Advanced Frontend Certifications.",
    actions: [{ label: "View Timeline", href: "#experience" }]
  },
  "education": {
    answer: "B.Sc. Information Technology Graduate (June 2026) from Deogiri College, Dr. Babasaheb Ambedkar Marathwada University with CGPA 7.1/10. Also holds 12th MCVC Computer Tech (73.83%) and 10th (72.20%).",
    actions: [{ label: "View Education & Certs", href: "#achievements" }]
  },
  "resume": {
    answer: "You can download Jay's official resume directly or view his verified experience and project portfolio online.",
    actions: [{ label: "Download Resume PDF", href: "/resume.pdf", isExternal: true }]
  },
  "contact": {
    answer: "Reach Jay directly via email at jk365242@gmail.com or send a direct message through the portfolio contact form.",
    actions: [{ label: "Go to Contact Form", href: "#contact" }]
  },
  "hiring": {
    answer: "Jay is actively OPEN TO WORK for full-time Full Stack & Frontend Engineer positions or high-impact freelance SaaS engineering contracts.",
    actions: [
      { label: "Contact Jay for Hire", href: "#contact" },
      { label: "Download Resume", href: "/resume.pdf", isExternal: true }
    ]
  }
}

export function AIAssistantWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'copilot',
      text: "👋 Welcome! I'm Jay's Portfolio Copilot. Select a quick action or ask about Jay's experience, skills, projects, or hiring availability.",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }
  ])

  const chatEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isOpen) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages, isOpen, isTyping])

  const handleSend = (textToSend?: string) => {
    const query = textToSend || input
    if (!query.trim()) return

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }

    setMessages(prev => [...prev, userMsg])
    if (!textToSend) setInput('')
    setIsTyping(true)

    // Fast instant response lookup
    setTimeout(() => {
      const lower = query.toLowerCase()
      let key = 'about'

      if (lower.includes('project') || lower.includes('pdfino') || lower.includes('quiz') || lower.includes('event') || lower.includes('chrbo')) {
        key = 'projects'
      } else if (lower.includes('skill') || lower.includes('tech') || lower.includes('react') || lower.includes('next') || lower.includes('node')) {
        key = 'skills'
      } else if (lower.includes('hire') || lower.includes('job') || lower.includes('work') || lower.includes('avail') || lower.includes('role')) {
        key = 'hiring'
      } else if (lower.includes('edu') || lower.includes('degree') || lower.includes('college') || lower.includes('cgpa')) {
        key = 'education'
      } else if (lower.includes('exp') || lower.includes('timeline') || lower.includes('background')) {
        key = 'experience'
      } else if (lower.includes('resume') || lower.includes('cv')) {
        key = 'resume'
      } else if (lower.includes('contact') || lower.includes('email') || lower.includes('reach')) {
        key = 'contact'
      }

      const match = COPILOT_KNOWLEDGE[key]
      const copilotMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'copilot',
        text: match.answer,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        actions: match.actions
      }

      setMessages(prev => [...prev, copilotMsg])
      setIsTyping(false)
    }, 300)
  }

  return (
    <>
      {/* Floating Trigger Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            onClick={() => setIsOpen(!isOpen)}
            className="h-14 w-14 rounded-full bg-primary text-primary-foreground shadow-2xl shadow-primary/30 border border-white/20 p-0 flex items-center justify-center relative"
            aria-label="Toggle Portfolio Copilot"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Bot className="w-6 h-6" />}
            {!isOpen && (
              <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-green-500"></span>
              </span>
            )}
          </Button>
        </motion.div>
      </div>

      {/* Copilot Drawer Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-4 sm:right-6 z-50 w-[92vw] sm:w-[400px] max-h-[580px] h-[72vh] flex flex-col rounded-3xl bg-background/95 backdrop-blur-2xl border border-white/10 shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 px-5 border-b border-white/10 bg-white/[0.02] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-2xl bg-primary/20 border border-primary/30 flex items-center justify-center text-primary">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground text-sm flex items-center gap-2">
                    Portfolio Copilot
                    <span className="px-2 py-0.5 rounded-full bg-green-500/20 text-green-400 text-[10px] font-semibold">Active</span>
                  </h3>
                  <p className="text-[11px] text-muted-foreground">Factual assistant for recruiter Q&A</p>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="w-8 h-8 rounded-full">
                <X className="w-4 h-4" />
              </Button>
            </div>

            {/* Chat Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {msg.sender === 'copilot' && (
                    <div className="w-6 h-6 rounded-lg bg-primary/20 border border-primary/30 flex items-center justify-center text-primary shrink-0 mt-0.5">
                      <Bot className="w-3.5 h-3.5" />
                    </div>
                  )}
                  <div className="max-w-[84%] space-y-2">
                    <div className={`p-3.5 rounded-2xl leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-primary text-primary-foreground rounded-tr-none font-medium'
                        : 'bg-white/5 border border-white/10 text-foreground rounded-tl-none'
                    }`}>
                      <p className="whitespace-pre-line">{msg.text}</p>
                    </div>

                    {msg.actions && msg.actions.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {msg.actions.map((act, idx) => (
                          act.isExternal ? (
                            <a
                              key={idx}
                              href={act.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center text-[11px] px-3 py-1 rounded-xl bg-primary/10 hover:bg-primary/20 text-primary border border-primary/30 font-semibold"
                            >
                              {act.label} <ExternalLink className="w-3 h-3 ml-1" />
                            </a>
                          ) : (
                            <a
                              key={idx}
                              href={act.href}
                              onClick={() => setIsOpen(false)}
                              className="inline-flex items-center text-[11px] px-3 py-1 rounded-xl bg-white/10 hover:bg-white/20 text-foreground border border-white/10 font-semibold"
                            >
                              {act.label} <ChevronRight className="w-3 h-3 ml-0.5" />
                            </a>
                          )
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex gap-2.5 items-center text-muted-foreground text-[11px]">
                  <Bot className="w-4 h-4 animate-spin text-primary" />
                  <span>Consulting portfolio knowledge...</span>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Quick Actions Scroll Bar */}
            <div className="p-2.5 px-4 border-t border-white/5 bg-white/[0.01] flex items-center gap-2 overflow-x-auto no-scrollbar">
              {QUICK_ACTIONS.map((qa, idx) => (
                qa.isExternal ? (
                  <a
                    key={idx}
                    href={qa.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="whitespace-nowrap text-[11px] px-3 py-1 rounded-full bg-white/5 hover:bg-primary/20 border border-white/10 text-muted-foreground hover:text-primary transition-colors font-medium shrink-0"
                  >
                    {qa.label}
                  </a>
                ) : (
                  <a
                    key={idx}
                    href={qa.href}
                    onClick={() => setIsOpen(false)}
                    className="whitespace-nowrap text-[11px] px-3 py-1 rounded-full bg-white/5 hover:bg-primary/20 border border-white/10 text-muted-foreground hover:text-primary transition-colors font-medium shrink-0"
                  >
                    {qa.label}
                  </a>
                )
              ))}
            </div>

            {/* Input Bar */}
            <div className="p-3 border-t border-white/10 bg-background/90 flex items-center gap-2">
              <input
                type="text"
                placeholder="Ask Copilot..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                className="flex-1 bg-white/5 border border-white/10 focus:border-primary/50 focus:outline-none rounded-xl px-3.5 py-2 text-xs text-foreground placeholder:text-muted-foreground/60"
              />
              <Button
                onClick={() => handleSend()}
                disabled={!input.trim() || isTyping}
                size="icon"
                className="w-8 h-8 rounded-xl bg-primary text-primary-foreground shrink-0 disabled:opacity-50"
              >
                <Send className="w-3.5 h-3.5" />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
