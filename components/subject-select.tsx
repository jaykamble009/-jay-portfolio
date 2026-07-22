'use client'

import { useCallback, useEffect, useId, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { ChevronDown, Check } from "lucide-react"
import { SUBJECT_OPTIONS, type SubjectValue } from "@/lib/validations/contact"

interface SubjectSelectProps {
  value: string
  onChange: (value: SubjectValue) => void
  disabled?: boolean
  hasError?: boolean
  id?: string
}

const INPUT_CLASS =
  "w-full bg-background/50 border border-white/10 rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all backdrop-blur-sm"

const ERROR_CLASS = "border-red-500/50 focus:ring-red-500/30 focus:border-red-500/50"

export function SubjectSelect({ value, onChange, disabled, hasError, id }: SubjectSelectProps) {
  const [open, setOpen] = useState(false)
  const [focusedIndex, setFocusedIndex] = useState<number>(-1)
  const containerRef = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLUListElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const generatedId = useId()
  const triggerId = id ?? generatedId
  const listboxId = `${triggerId}-listbox`

  const selectedOption = SUBJECT_OPTIONS.find((o) => o.value === value)

  const close = useCallback(() => {
    setOpen(false)
    setFocusedIndex(-1)
    buttonRef.current?.focus()
  }, [])

  const select = useCallback(
    (val: SubjectValue) => {
      onChange(val)
      close()
    },
    [onChange, close]
  )

  // Close on outside click
  useEffect(() => {
    if (!open) return
    const handler = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) close()
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [open, close])

  // Close on Escape
  useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") close()
    }
    document.addEventListener("keydown", handler)
    return () => document.removeEventListener("keydown", handler)
  }, [open, close])

  // Scroll focused item into view
  useEffect(() => {
    if (open && focusedIndex >= 0 && listRef.current) {
      const item = listRef.current.children[focusedIndex] as HTMLElement | undefined
      item?.scrollIntoView({ block: "nearest" })
    }
  }, [open, focusedIndex])

  const handleButtonKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    switch (e.key) {
      case "Enter":
      case " ":
      case "ArrowDown":
        e.preventDefault()
        setOpen(true)
        setFocusedIndex(selectedOption ? SUBJECT_OPTIONS.findIndex((o) => o.value === value) : 0)
        break
      case "ArrowUp":
        e.preventDefault()
        setOpen(true)
        setFocusedIndex(SUBJECT_OPTIONS.length - 1)
        break
    }
  }

  const handleListKeyDown = (e: React.KeyboardEvent<HTMLUListElement>) => {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault()
        setFocusedIndex((prev) => (prev + 1) % SUBJECT_OPTIONS.length)
        break
      case "ArrowUp":
        e.preventDefault()
        setFocusedIndex((prev) => (prev - 1 + SUBJECT_OPTIONS.length) % SUBJECT_OPTIONS.length)
        break
      case "Enter":
      case " ":
        e.preventDefault()
        if (focusedIndex >= 0) select(SUBJECT_OPTIONS[focusedIndex].value)
        break
      case "Escape":
        e.preventDefault()
        close()
        break
      case "Tab":
        close()
        break
      case "Home":
        e.preventDefault()
        setFocusedIndex(0)
        break
      case "End":
        e.preventDefault()
        setFocusedIndex(SUBJECT_OPTIONS.length - 1)
        break
    }
  }

  return (
    <div ref={containerRef} className="relative">
      {/* Trigger button */}
      <button
        ref={buttonRef}
        type="button"
        id={triggerId}
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listboxId}
        aria-label="Subject"
        disabled={disabled}
        onClick={() => {
          if (!open) {
            setFocusedIndex(selectedOption ? SUBJECT_OPTIONS.findIndex((o) => o.value === value) : 0)
          }
          setOpen((prev) => !prev)
        }}
        onKeyDown={handleButtonKeyDown}
        className={[
          INPUT_CLASS,
          hasError ? ERROR_CLASS : "",
          "flex items-center justify-between text-left cursor-pointer",
          disabled ? "opacity-50 cursor-not-allowed" : "",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <span className={selectedOption ? "text-foreground" : "text-muted-foreground"}>
          {selectedOption ? selectedOption.label : "Select a Subject"}
        </span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className="ml-2 shrink-0 text-muted-foreground"
          aria-hidden="true"
        >
          <ChevronDown className="h-4 w-4" />
        </motion.span>
      </button>

      {/* Dropdown list */}
      <AnimatePresence>
        {open && (
          <motion.ul
            ref={listRef}
            id={listboxId}
            role="listbox"
            aria-label="Subject options"
            aria-activedescendant={focusedIndex >= 0 ? `${triggerId}-option-${focusedIndex}` : undefined}
            tabIndex={-1}
            onKeyDown={handleListKeyDown}
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="absolute z-50 mt-2 w-full overflow-hidden rounded-xl border border-white/10 bg-background/80 backdrop-blur-xl shadow-2xl shadow-black/30 outline-none max-h-72 overflow-y-auto"
          >
            {SUBJECT_OPTIONS.map((option, index) => {
              const isSelected = option.value === value
              const isFocused = index === focusedIndex

              return (
                <li
                  key={option.value}
                  id={`${triggerId}-option-${index}`}
                  role="option"
                  aria-selected={isSelected}
                  onMouseEnter={() => setFocusedIndex(index)}
                  onClick={() => select(option.value)}
                  className={[
                    "flex items-center justify-between px-4 py-3 text-sm cursor-pointer select-none transition-colors duration-100",
                    isFocused ? "bg-primary/15 text-foreground" : "text-foreground/80 hover:bg-white/5",
                    isSelected ? "font-medium" : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >
                  <span>{option.label}</span>
                  {isSelected && (
                    <Check className="h-3.5 w-3.5 shrink-0 text-primary" aria-hidden="true" />
                  )}
                </li>
              )
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  )
}
