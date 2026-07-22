'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { HighlightText } from '@/components/highlight-text'

export function TypewriterText({ 
  text, 
  delay = 0, 
  speed = 20,
  startTypingProp = true,
  highlightKeywords = [],
  onComplete
}: { 
  text: string; 
  delay?: number; 
  speed?: number;
  startTypingProp?: boolean;
  highlightKeywords?: string[];
  onComplete?: () => void;
}) {
  // Initialize with full text for SSR and JS-disabled fallback
  const [displayText, setDisplayText] = useState(text)
  const [hasCompleted, setHasCompleted] = useState(false)
  const [cursorVisible, setCursorVisible] = useState(false)
  const [isReady, setIsReady] = useState(false)
  
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const shouldReduceMotion = useReducedMotion()

  // On mount, clear the text so we can start typing
  useEffect(() => {
    setIsReady(true)
    if (!shouldReduceMotion) {
      setDisplayText('')
      setCursorVisible(true)
    }
  }, [shouldReduceMotion])

  useEffect(() => {
    if (!isReady) return

    if (shouldReduceMotion) {
      if (startTypingProp && !hasCompleted) {
        setHasCompleted(true)
        onComplete?.()
      }
      return
    }

    if (isInView && startTypingProp && !hasCompleted) {
      let timeoutId: NodeJS.Timeout
      let intervalId: NodeJS.Timeout
      
      const startTyping = () => {
        let i = 0
        intervalId = setInterval(() => {
          setDisplayText(text.slice(0, i + 1))
          i++
          if (i >= text.length) {
            clearInterval(intervalId)
            setHasCompleted(true)
            setTimeout(() => {
              setCursorVisible(false)
              onComplete?.()
            }, 1000)
          }
        }, speed)
      }

      timeoutId = setTimeout(startTyping, delay * 1000)
      return () => {
        clearTimeout(timeoutId)
        clearInterval(intervalId)
      }
    }
  }, [isInView, hasCompleted, text, delay, speed, shouldReduceMotion, isReady, startTypingProp, onComplete])

  return (
    <span ref={ref} className="relative">
      <noscript suppressHydrationWarning>{text}</noscript>
      <span className={isReady ? "" : "opacity-0"}>
        <HighlightText 
          text={shouldReduceMotion ? text : displayText} 
          keywords={highlightKeywords} 
          variant="body" 
        />
      </span>
      {cursorVisible && !shouldReduceMotion && (
        <motion.span 
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
          className="inline-block w-[3px] h-[0.9em] bg-primary ml-1 -mb-[0.1em] align-baseline rounded-full shadow-[0_0_8px_rgba(var(--primary),0.8)]"
        />
      )}
    </span>
  )
}
