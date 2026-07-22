'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from 'next-themes'
import { executeCommand, availableCommands } from '@/lib/terminal-commands'

interface CommandHistory {
  command: string
  output: React.ReactNode
}

const asciiArt = `
      ___  ___  __   __    _  __ ___  __  __  ___  _    ___ 
     |_  |/ _ \\ \\ \\ / /   | |/ // _ \\|  \\/  || _ \\| |  | __|
      / /| ( ) | \\ V /    | ' <| ( ) | |\\/| || _ <| |__| _| 
     /___|\\___/   |_|     |_|\\_\\\\___/|_|  |_||___/|____|___|
`

const bootMessages = [
  "Initializing jayOS v3.1.4...",
  "Loading kernel modules................... OK",
  "Mounting virtual filesystems............. OK",
  "Starting network interface............... OK",
  "Establishing secure connection........... OK",
  "Loading user profile [Jay Kamble]........ OK",
  "System ready."
]

export function Terminal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const [input, setInput] = useState('')
  const [history, setHistory] = useState<CommandHistory[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [isBooting, setIsBooting] = useState(true)
  const [bootStep, setBootStep] = useState(0)
  
  const inputRef = useRef<HTMLInputElement>(null)
  const bottomRef = useRef<HTMLDivElement>(null)
  const { setTheme } = useTheme()

  // Handle boot sequence
  useEffect(() => {
    if (isOpen && isBooting) {
      if (bootStep < bootMessages.length) {
        const timer = setTimeout(() => {
          setBootStep(prev => prev + 1)
        }, Math.random() * 200 + 100) // random delay between 100-300ms
        return () => clearTimeout(timer)
      } else {
        const timer = setTimeout(() => {
          setIsBooting(false)
          setHistory([
            {
              command: 'welcome',
              output: (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="mt-2 mb-6"
                >
                  <pre className="text-primary font-bold text-[8px] sm:text-xs md:text-sm mb-4 drop-shadow-[0_0_8px_rgba(var(--primary),0.8)] overflow-x-auto whitespace-pre">
                    {asciiArt}
                  </pre>
                  <div className="text-foreground/80 mb-2">
                    Welcome to the Interactive Terminal.
                  </div>
                  <div className="text-foreground/80">
                    Type <span className="text-cyan-400 font-bold">help</span> to see available commands, or <span className="text-amber-400 font-bold">neofetch</span> for a quick summary.
                  </div>
                </motion.div>
              )
            }
          ])
        }, 300)
        return () => clearTimeout(timer)
      }
    }
  }, [isOpen, isBooting, bootStep])

  // Auto focus input when modal opens or finishes booting
  useEffect(() => {
    if (isOpen && !isBooting) {
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [isOpen, isBooting])

  // Auto scroll to bottom on new history or boot step
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [history, bootStep])

  // Reset boot sequence if completely closed and reopened (optional, but let's just keep it simple)
  // For now, it will only boot once per session.

  const handleCommand = (cmd: string) => {
    const { output, action, payload } = executeCommand(cmd)

    if (action === 'clear') {
      setHistory([])
      return
    }

    if (action === 'exit') {
      onClose()
    }

    if (action === 'theme' && payload) {
      setTheme(payload)
    }

    if (action === 'scroll' && payload) {
      const element = document.querySelector(payload)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
      onClose()
    }

    if (action === 'link' && payload) {
      window.open(payload, '_blank')
    }

    setHistory(prev => [...prev, { command: cmd, output }])
  }

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return
    handleCommand(input)
    setInput('')
    setHistoryIndex(-1)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      const commandsOnly = history.map(h => h.command).filter(c => c !== 'welcome' && c !== '')
      if (commandsOnly.length === 0) return
      
      const nextIndex = historyIndex + 1
      if (nextIndex < commandsOnly.length) {
        setHistoryIndex(nextIndex)
        setInput(commandsOnly[commandsOnly.length - 1 - nextIndex])
      }
    }
    else if (e.key === 'ArrowDown') {
      e.preventDefault()
      const commandsOnly = history.map(h => h.command).filter(c => c !== 'welcome' && c !== '')
      
      const prevIndex = historyIndex - 1
      if (prevIndex >= 0) {
        setHistoryIndex(prevIndex)
        setInput(commandsOnly[commandsOnly.length - 1 - prevIndex])
      } else if (prevIndex === -1) {
        setHistoryIndex(-1)
        setInput('')
      }
    }
    else if (e.key === 'Tab') {
      e.preventDefault()
      const matches = availableCommands.filter(c => c.startsWith(input.toLowerCase()))
      if (matches.length === 1) {
        setInput(matches[0])
      } else if (matches.length > 1) {
        setHistory(prev => [...prev, { command: input, output: matches.join('  ') }])
      }
    }
  }

  const renderPromptPrefix = () => (
    <div className="flex items-center shrink-0 mr-2 text-sm sm:text-base">
      <span className="text-green-500 font-bold">jay@portfolio</span>
      <span className="text-foreground">:</span>
      <span className="text-blue-400 font-bold">~</span>
      <span className="text-foreground font-bold ml-1">$</span>
    </div>
  )

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed bottom-0 inset-x-0 sm:inset-x-auto sm:bottom-24 sm:right-6 z-[200] flex flex-col items-center sm:items-end pointer-events-none px-2 sm:px-0 pb-2 sm:pb-0">
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 1, transformOrigin: 'bottom' }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="pointer-events-auto relative w-full sm:w-[450px] h-[55dvh] max-h-[500px] sm:max-h-none sm:h-[600px] bg-white/70 dark:bg-black/70 backdrop-blur-2xl border border-white/30 dark:border-white/10 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.2)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.5)] flex flex-col overflow-hidden"
          >
            {/* Mac-style Header */}
            <div className="flex items-center px-4 py-3 bg-white/30 dark:bg-white/5 border-b border-white/30 dark:border-white/10 backdrop-blur-md">
              <div className="flex space-x-2">
                <button onClick={onClose} className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors" title="Close" />
                <button className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 transition-colors" title="Minimize" />
                <button className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 transition-colors" title="Maximize" />
              </div>
              <div className="flex-1 text-center text-xs font-mono text-muted-foreground select-none">
                jay@portfolio:~
              </div>
            </div>

            {/* Terminal Body */}
            <div 
              className="flex-1 p-4 sm:p-6 overflow-y-auto font-mono text-sm sm:text-base scrollbar-thin scrollbar-thumb-white/10 scroll-smooth selection:bg-primary/30"
              onClick={() => {
                if (!isBooting) inputRef.current?.focus()
              }}
            >
              {isBooting ? (
                <div className="text-muted-foreground leading-relaxed">
                  {bootMessages.slice(0, bootStep).map((msg, idx) => (
                    <div key={idx}>{msg}</div>
                  ))}
                  {bootStep < bootMessages.length && (
                    <span className="inline-block w-2.5 h-5 bg-foreground animate-pulse ml-1 align-middle" />
                  )}
                </div>
              ) : (
                <>
                  {history.map((item, i) => (
                    <div key={i} className="mb-2">
                      {item.command !== 'welcome' && (
                        <div className="flex items-start break-all">
                          {renderPromptPrefix()}
                          <span className="text-foreground leading-relaxed">{item.command}</span>
                        </div>
                      )}
                      {item.output && <div className="mt-1 ml-0 text-foreground/90 leading-relaxed whitespace-pre-wrap">{item.output}</div>}
                    </div>
                  ))}
                  
                  <form onSubmit={onSubmit} className="flex items-start mt-2 group relative">
                    {renderPromptPrefix()}
                    <div className="relative flex-1 flex items-center h-6 sm:h-7">
                      <input
                        ref={inputRef}
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="w-full bg-transparent border-none outline-none text-foreground font-mono placeholder:text-muted-foreground/30 caret-transparent"
                        spellCheck={false}
                        autoComplete="off"
                        autoFocus
                      />
                      {/* Custom Blinking Cursor */}
                      <span 
                        className="absolute pointer-events-none text-transparent whitespace-pre flex items-center h-full"
                      >
                        {input}
                        <span className="inline-block w-2.5 h-5 bg-foreground animate-pulse ml-px align-middle" />
                      </span>
                    </div>
                  </form>
                </>
              )}
              <div ref={bottomRef} className="h-4" />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
