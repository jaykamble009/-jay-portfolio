'use client'

import React, { useEffect, useState } from 'react'

const CHARS = '!<>-_\\/[]{}—=+*^?#________'

export function TextScramble({ text, className }: { text: string, className?: string }) {
  const [displayText, setDisplayText] = useState(text)

  useEffect(() => {
    let iteration = 0
    let interval: ReturnType<typeof setInterval> | null = null

    const updateText = () => {
      setDisplayText(
        text
          .split('')
          .map((letter, index) => {
            if (index < iteration) {
              return text[index]
            }
            return CHARS[Math.floor(Math.random() * CHARS.length)]
          })
          .join('')
      )

      if (iteration >= text.length) {
        if (interval) clearInterval(interval)
      }
      iteration += 1 / 3
    }

    interval = setInterval(updateText, 30)

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [text])

  return <span className={className}>{displayText}</span>
}
