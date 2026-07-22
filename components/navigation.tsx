"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")

  const navItems = [
    { name: "Home", href: "home" },
    { name: "About", href: "about" },
    { name: "Projects", href: "projects" },
    { name: "GitHub", href: "github" },
    { name: "Contact", href: "contact" },
  ]

  useEffect(() => {
    const handleScroll = () => {
      // 1. Near bottom of page -> activate contact
      const isAtBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 250
      if (isAtBottom) {
        setActiveSection("contact")
        return
      }

      // 2. Check sections
      const viewportCenter = window.innerHeight * 0.45
      let matchedSection = "home"

      for (let i = 0; i < navItems.length; i++) {
        const item = navItems[i]
        const element = document.getElementById(item.href)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (item.href === "contact" && rect.top <= window.innerHeight * 0.75) {
            matchedSection = "contact"
            break
          }
          if (rect.top <= viewportCenter && rect.bottom >= 100) {
            matchedSection = item.href
          }
        }
      }

      setActiveSection(matchedSection)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    setActiveSection(href)
    const element = document.getElementById(href)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="font-bold text-xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent cursor-default">
            Portfolio
          </div>

          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const isActive = activeSection === item.href
              return (
                <a
                  key={item.name}
                  href={`#${item.href}`}
                  onClick={(e) => handleSmoothScroll(e, item.href)}
                  className={cn(
                    "relative px-4 py-2 text-sm font-medium transition-colors duration-200 rounded-full",
                    isActive ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavPill"
                      className="absolute inset-0 bg-primary rounded-full -z-10"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{item.name}</span>
                </a>
              )
            })}
            <div className="pl-4 ml-2 border-l border-border h-6 flex items-center">
              <ThemeToggle />
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <Button variant="ghost" size="sm" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col space-y-1">
              {navItems.map((item) => {
                const isActive = activeSection === item.href
                return (
                  <a
                    key={item.name}
                    href={`#${item.href}`}
                    onClick={(e) => {
                      handleSmoothScroll(e, item.href)
                      setIsOpen(false)
                    }}
                    className={cn(
                      "px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200",
                      isActive 
                        ? "bg-primary/10 text-primary border border-primary/20" 
                        : "text-muted-foreground hover:text-foreground hover:bg-white/5 border border-transparent"
                    )}
                  >
                    {item.name}
                  </a>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
