'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Eye, Download, X, ExternalLink, FileText } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function ResumePreviewModal() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Eye Preview Trigger Button */}
      <Button
        type="button"
        variant="outline"
        size="lg"
        onClick={() => setIsOpen(true)}
        className="font-semibold px-4 sm:px-5 h-11 sm:h-12 rounded-xl border-white/10 hover:bg-white/10 text-foreground text-sm sm:text-base flex items-center gap-2"
        title="Preview Resume without downloading"
      >
        <Eye className="w-4 h-4 text-primary" />
        <span className="hidden sm:inline">Preview</span>
      </Button>

      {/* Modal Dialog */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[150] flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl h-[90vh] bg-zinc-950 border border-white/10 rounded-2xl sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-white/[0.02]">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-foreground">
                      Jay Kamble — Resume
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      B.Sc. IT Graduate • Full Stack & AI-First Developer
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button asChild size="sm" className="rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-4 flex items-center gap-1.5 shadow-sm">
                    <a href="/resume.pdf" download="Jay_Kamble_Resume.pdf">
                      <Download className="w-3.5 h-3.5" />
                      <span>Download</span>
                    </a>
                  </Button>

                  <Button asChild variant="outline" size="sm" className="rounded-xl border-white/10 hover:bg-white/5 text-foreground hidden sm:flex items-center gap-1.5">
                    <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>New Tab</span>
                    </a>
                  </Button>

                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 rounded-xl bg-white/5 hover:bg-red-500/20 text-muted-foreground hover:text-red-400 transition-colors ml-1"
                    title="Close Preview"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* PDF Viewer Body */}
              <div className="flex-1 w-full bg-zinc-900/50 p-2 sm:p-4">
                <iframe
                  src="/resume.pdf#view=FitH"
                  className="w-full h-full rounded-xl border border-white/5 bg-white"
                  title="Jay Kamble Resume Preview"
                />
              </div>

              {/* Bottom Bar */}
              <div className="px-6 py-2.5 border-t border-white/5 bg-white/[0.01] flex items-center justify-between text-xs text-muted-foreground">
                <span>Verified Resume • Updated 2026</span>
                <span className="font-mono text-[11px]">jaykamble009.in</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
