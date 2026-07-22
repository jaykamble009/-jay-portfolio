import React, { useMemo } from 'react'

type HighlightVariant = 'body' | 'hero' | 'terminal' | 'github' | 'footer'

interface HighlightTextProps {
  text: string
  keywords?: string[]
  variant?: HighlightVariant
  className?: string
}

const getVariantStyle = (variant: HighlightVariant): string => {
  switch (variant) {
    case 'hero':
      return 'bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent font-extrabold'
    case 'terminal':
      return 'text-cyan-400 font-semibold'
    case 'github':
      return 'bg-gradient-to-r from-muted-foreground to-foreground bg-clip-text text-transparent font-semibold'
    case 'footer':
      return 'text-primary font-medium'
    case 'body':
    default:
      return 'text-primary font-semibold relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-primary/30'
  }
}

export const HighlightText = React.memo(({ 
  text, 
  keywords = [], 
  variant = 'body',
  className = ''
}: HighlightTextProps) => {
  const parts = useMemo(() => {
    if (!keywords || keywords.length === 0) return [{ text, isMatch: false }]

    // Escape regex specials
    const escapedKeywords = keywords.map(k => k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
    
    // Sort by length descending to match longest phrases first
    escapedKeywords.sort((a, b) => b.length - a.length)

    // Regex to match whole words/phrases case-insensitively
    // We use (\b|^\W) to ensure we match at word boundaries, but this can be tricky with punctuation.
    // simpler reliable regex: just match the phrases ignoring boundaries, 
    // but the user requested "whole-word matching".
    // \b works well for English alphanumeric words.
    const regex = new RegExp(`\\b(${escapedKeywords.join('|')})\\b`, 'gi')
    
    const splitText = text.split(regex)
    
    // The split array will alternate: [non-match, match, non-match, match, ...]
    // because of the capturing group in the regex.
    return splitText.map(part => {
      if (!part) return null
      const isMatch = keywords.some(k => k.toLowerCase() === part.toLowerCase())
      return { text: part, isMatch }
    }).filter(Boolean) as { text: string, isMatch: boolean }[]

  }, [text, keywords])

  if (parts.length === 1 && !parts[0].isMatch) {
    return <span className={className}>{text}</span>
  }

  const highlightStyle = getVariantStyle(variant)

  return (
    <span className={className}>
      {parts.map((part, i) => 
        part.isMatch ? (
          <span key={i} className={highlightStyle}>{part.text}</span>
        ) : (
          <span key={i}>{part.text}</span>
        )
      )}
    </span>
  )
})

HighlightText.displayName = 'HighlightText'
