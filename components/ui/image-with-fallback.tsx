'use client'

import { useState } from 'react'
import Image, { ImageProps } from 'next/image'
import { ImageIcon } from 'lucide-react'

interface ImageWithFallbackProps extends Omit<ImageProps, 'src'> {
  src: string
  fallbackSrc?: string
}

export function ImageWithFallback({
  src,
  fallbackSrc = '/placeholder.svg',
  alt,
  className,
  ...props
}: ImageWithFallbackProps) {
  const [error, setError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const finalSrc = error ? fallbackSrc : src

  return (
    <div className={`relative overflow-hidden w-full h-full ${className || ''}`}>
      {isLoading && (
        <div className="absolute inset-0 bg-secondary/20 animate-pulse flex flex-col items-center justify-center gap-2">
          <ImageIcon className="w-8 h-8 text-muted-foreground/30 animate-bounce" />
        </div>
      )}
      <Image
        src={finalSrc}
        alt={alt}
        className={`object-cover transition-all duration-700 ${isLoading ? 'opacity-0 scale-105' : 'opacity-100 scale-100'}`}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setError(true)
          setIsLoading(false)
        }}
        {...props}
      />
    </div>
  )
}
