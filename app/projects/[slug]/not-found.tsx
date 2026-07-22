import Link from 'next/link'
import { ChevronLeft, FolderSearch } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function ProjectNotFound() {
  return (
    <div className="min-h-screen bg-background relative flex flex-col items-center justify-center p-4">
      {/* Background Accents */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center text-center max-w-md">
        <div className="w-20 h-20 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center mb-8 shadow-2xl">
          <FolderSearch className="w-10 h-10 text-muted-foreground" />
        </div>
        
        <h1 className="text-3xl font-bold text-foreground mb-4">Project Not Found</h1>
        <p className="text-muted-foreground mb-8 leading-relaxed">
          The project case study you're looking for doesn't exist or has been moved. Let's get you back to the portfolio.
        </p>
        
        <Button asChild className="rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-6 shadow-lg shadow-primary/25">
          <Link href="/#projects">
            <ChevronLeft className="w-4 h-4 mr-2" />
            Back to Projects
          </Link>
        </Button>
      </div>
    </div>
  )
}
