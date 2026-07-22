"use client"

import { useEffect, useRef } from "react"

export function GlowingOrb() {
  const orbRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!orbRef.current) return

      const { clientX, clientY } = e
      const { innerWidth, innerHeight } = window

      // Calculate mouse position as percentage
      const xPercent = (clientX / innerWidth - 0.5) * 20
      const yPercent = (clientY / innerHeight - 0.5) * 20

      // Apply subtle movement based on mouse position
      orbRef.current.style.transform = `translate(${xPercent}px, ${yPercent}px)`
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10 opacity-30 dark:opacity-100">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5" />

      {/* Main glowing orb */}
      <div
        ref={orbRef}
        className="floating-orb absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full transition-transform duration-300 ease-out"
        style={{
          background: `radial-gradient(circle, 
            oklch(0.65 0.15 230 / 0.3) 0%, 
            oklch(0.55 0.2 290 / 0.2) 35%, 
            oklch(0.65 0.15 180 / 0.1) 70%, 
            transparent 100%)`,
        }}
      />

      {/* Secondary orbs for depth */}
      <div className="absolute top-1/4 right-1/4 w-32 h-32 rounded-full pulse-glow bg-gradient-radial from-accent/20 to-transparent animate-pulse" />
      <div
        className="absolute bottom-1/3 left-1/4 w-24 h-24 rounded-full pulse-glow bg-gradient-radial from-secondary/20 to-transparent animate-pulse"
        style={{ animationDelay: "1s" }}
      />

      {/* Additional floating orbs */}
      <div
        className="absolute top-1/3 left-1/6 w-16 h-16 rounded-full floating-orb bg-gradient-radial from-primary/15 to-transparent"
        style={{ animationDelay: "2s" }}
      />
      <div
        className="absolute bottom-1/4 right-1/3 w-20 h-20 rounded-full floating-orb bg-gradient-radial from-accent/15 to-transparent"
        style={{ animationDelay: "3s" }}
      />
      <div
        className="absolute top-2/3 right-1/6 w-12 h-12 rounded-full pulse-glow bg-gradient-radial from-secondary/15 to-transparent"
        style={{ animationDelay: "4s" }}
      />

      {/* Subtle moving particles */}
      <div
        className="absolute top-1/5 left-1/2 w-2 h-2 rounded-full bg-primary/30 animate-ping"
        style={{ animationDelay: "0.5s" }}
      />
      <div
        className="absolute bottom-1/5 left-1/3 w-1 h-1 rounded-full bg-accent/40 animate-ping"
        style={{ animationDelay: "1.5s" }}
      />
      <div
        className="absolute top-3/4 right-1/4 w-1.5 h-1.5 rounded-full bg-secondary/35 animate-ping"
        style={{ animationDelay: "2.5s" }}
      />
    </div>
  )
}
