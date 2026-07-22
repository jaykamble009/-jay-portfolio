'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import dynamic from 'next/dynamic'

import { TerminalSquare, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

// Lazy load the terminal component to preserve Lighthouse 95+ score
const TerminalModal = dynamic(() => import('./terminal').then(mod => mod.Terminal), { 

  ssr: false,
})

interface TerminalContextType {
  isOpen: boolean
  openTerminal: () => void
  closeTerminal: () => void
  toggleTerminal: () => void
}

const TerminalContext = createContext<TerminalContextType | undefined>(undefined)

export function useTerminal() {
  const context = useContext(TerminalContext)
  if (!context) throw new Error("useTerminal must be used within TerminalProvider")
  return context
}

export function TerminalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)

  const openTerminal = () => setIsOpen(true)
  const closeTerminal = () => setIsOpen(false)
  const toggleTerminal = () => setIsOpen(prev => !prev)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Toggle on backtick (`), Ctrl+`, or Ctrl+K
      if (e.key === '`' || (e.ctrlKey && e.key === '`') || (e.ctrlKey && e.key.toLowerCase() === 'k')) {
        e.preventDefault()
        toggleTerminal()
      }
      // Close on Escape
      if (e.key === 'Escape' && isOpen) {
        e.preventDefault()
        closeTerminal()
      }
    }
    
    // Use capture phase to prevent other inputs from eating the event
    window.addEventListener('keydown', handleKeyDown, true)
    return () => window.removeEventListener('keydown', handleKeyDown, true)
  }, [isOpen])

  return (
    <TerminalContext.Provider value={{ isOpen, openTerminal, closeTerminal, toggleTerminal }}>
      {children}
      <TerminalFloatingButton toggleTerminal={toggleTerminal} isOpen={isOpen} />
      <TerminalWrapper isOpen={isOpen} closeTerminal={closeTerminal} />
    </TerminalContext.Provider>
  )
}

function TerminalFloatingButton({ toggleTerminal, isOpen }: { toggleTerminal: () => void, isOpen: boolean }) {
  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8 }}
      animate={
        isOpen 
          ? { opacity: 1, scale: 1 } 
          : { 
              opacity: 1, 
              scale: [1, 1.05, 1], 
              boxShadow: [
                "0 0 0 0 rgba(var(--primary), 0)",
                "0 0 20px 2px rgba(var(--primary), 0.3)",
                "0 0 0 0 rgba(var(--primary), 0)"
              ],
            }
      }
      transition={
        isOpen 
          ? { duration: 0.2 } 
          : { repeat: Infinity, duration: 2.5, ease: "easeInOut" }
      }
      whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
      whileTap={{ scale: 0.95 }}
      onClick={toggleTerminal}
      aria-label={isOpen ? "Close Interactive Terminal" : "Open Interactive Terminal"}
      className="fixed bottom-6 right-6 z-[250] w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-2xl flex items-center justify-center ring-2 ring-primary/20 transition-colors hover:bg-primary/90"
    >
      {isOpen ? (
        <X className="w-6 h-6 animate-in fade-in zoom-in duration-200" />
      ) : (
        <TerminalSquare className="w-6 h-6 animate-in fade-in zoom-in duration-200" />
      )}
    </motion.button>
  )
}

function TerminalWrapper({ isOpen, closeTerminal }: { isOpen: boolean, closeTerminal: () => void }) {
  // Only mount the terminal the first time it is opened.
  // This defers loading the heavy terminal JS bundle until actually needed.
  // Once mounted, it stays in the DOM so command history state is preserved.
  const [hasOpened, setHasOpened] = useState(false)
  
  useEffect(() => {
    if (isOpen) setHasOpened(true)
  }, [isOpen])

  if (!hasOpened) return null
  
  return <TerminalModal isOpen={isOpen} onClose={closeTerminal} />
}
