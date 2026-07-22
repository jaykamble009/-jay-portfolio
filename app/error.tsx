'use client'

import { useEffect } from 'react'
import { Terminal, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service in production
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-8 bg-background relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-destructive/10 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="w-full max-w-2xl bg-white/5 dark:bg-black/40 backdrop-blur-2xl border border-white/20 dark:border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden relative z-10">
        {/* Mac-style Header */}
        <div className="flex items-center px-4 py-3 bg-white/10 dark:bg-white/5 border-b border-white/20 dark:border-white/10">
          <div className="flex space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <div className="flex-1 text-center text-xs font-mono text-muted-foreground select-none">
            critical_error@portfolio:~
          </div>
        </div>

        {/* Terminal Body */}
        <div className="p-6 sm:p-8 font-mono text-sm sm:text-base selection:bg-destructive/30">
          <div className="flex items-center text-destructive mb-4">
            <Terminal className="w-5 h-5 mr-2" />
            <span className="font-bold">jay@portfolio:~$</span>
            <span className="ml-2 text-foreground">tail -f /var/log/syslog</span>
          </div>
          
          <div className="text-destructive font-bold mb-6 text-lg sm:text-xl">
            FATAL ERROR EXCEPTION CAUGHT
          </div>
          
          <div className="text-muted-foreground leading-relaxed mb-8">
            <p className="mb-2 text-foreground">Something went wrong during execution.</p>
            <div className="p-4 bg-black/50 rounded-lg text-xs break-all mt-4 border border-destructive/20 text-destructive/80">
              {error.message || 'Unknown runtime exception'}
            </div>
          </div>

          <div className="mt-8 flex justify-end">
            <Button 
              onClick={() => reset()}
              variant="outline"
              className="border-destructive/30 text-destructive hover:bg-destructive/10 hover:text-destructive"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Reboot System
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
