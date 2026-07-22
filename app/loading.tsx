export default function Loading() {
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-background backdrop-blur-md">
      <div className="relative flex flex-col items-center justify-center">
        {/* Pulsing Glowing Orb */}
        <div className="absolute w-32 h-32 bg-primary/20 rounded-full blur-xl animate-pulse" />
        <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin z-10" />
        
        {/* Terminal Loading Text */}
        <div className="mt-8 font-mono text-sm text-muted-foreground flex items-center animate-pulse z-10">
          <span className="text-primary mr-2">jay@system:~$</span>
          booting_sequence...
        </div>
      </div>
    </div>
  )
}
