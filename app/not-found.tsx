import Link from "next/link"
import { Terminal, Home } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-8 bg-background relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="w-full max-w-2xl bg-white/5 dark:bg-black/40 backdrop-blur-2xl border border-white/20 dark:border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden relative z-10">
        {/* Mac-style Header */}
        <div className="flex items-center px-4 py-3 bg-white/10 dark:bg-white/5 border-b border-white/20 dark:border-white/10">
          <div className="flex space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <div className="flex-1 text-center text-xs font-mono text-muted-foreground select-none">
            error@portfolio:~
          </div>
        </div>

        {/* Terminal Body */}
        <div className="p-6 sm:p-8 font-mono text-sm sm:text-base selection:bg-primary/30">
          <div className="flex items-center text-primary mb-4">
            <Terminal className="w-5 h-5 mr-2" />
            <span className="font-bold">jay@portfolio:~$</span>
            <span className="ml-2 text-foreground">curl /page-not-found</span>
          </div>
          
          <div className="text-destructive font-bold mb-6 text-lg sm:text-2xl">
            HTTP 404: PAGE NOT FOUND
          </div>
          
          <div className="text-muted-foreground leading-relaxed mb-8">
            <p className="mb-2">The requested resource could not be located on this server.</p>
            <p>Possible reasons:</p>
            <ul className="list-disc list-inside ml-2 mt-2 space-y-1">
              <li>The URL is incorrect</li>
              <li>The page was moved or deleted</li>
              <li>A glitch in the matrix</li>
            </ul>
          </div>

          <div className="flex items-center text-primary mb-4">
            <span className="font-bold">jay@portfolio:~$</span>
            <span className="ml-2 text-foreground animate-pulse">_</span>
          </div>

          <div className="mt-8 flex justify-end">
            <Link 
              href="/"
              className="flex items-center px-4 py-2 bg-primary/20 hover:bg-primary/30 text-primary border border-primary/30 rounded-lg transition-colors font-sans font-medium"
            >
              <Home className="w-4 h-4 mr-2" />
              Return Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
