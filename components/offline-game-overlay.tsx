'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { WifiOff, Wifi, Play, RotateCcw, Volume2, VolumeX, X, Trophy, Sparkles, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'

// Sound synthesizer using Web Audio API (Zero external assets needed!)
class SoundFX {
  private ctx: AudioContext | null = null

  private getContext() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext
      if (AudioCtx) this.ctx = new AudioCtx()
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume()
    }
    return this.ctx
  }

  jump() {
    try {
      const ctx = this.getContext()
      if (!ctx) return
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'triangle'
      osc.frequency.setValueAtTime(150, ctx.currentTime)
      osc.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 0.15)
      gain.gain.setValueAtTime(0.15, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15)
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.start()
      osc.stop(ctx.currentTime + 0.15)
    } catch {}
  }

  collect() {
    try {
      const ctx = this.getContext()
      if (!ctx) return
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'sine'
      osc.frequency.setValueAtTime(523.25, ctx.currentTime) // C5
      osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.08) // E5
      osc.frequency.setValueAtTime(783.99, ctx.currentTime + 0.16) // G5
      gain.gain.setValueAtTime(0.2, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.25)
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.start()
      osc.stop(ctx.currentTime + 0.25)
    } catch {}
  }

  hit() {
    try {
      const ctx = this.getContext()
      if (!ctx) return
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'sawtooth'
      osc.frequency.setValueAtTime(220, ctx.currentTime)
      osc.frequency.exponentialRampToValueAtTime(55, ctx.currentTime + 0.3)
      gain.gain.setValueAtTime(0.25, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3)
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.start()
      osc.stop(ctx.currentTime + 0.3)
    } catch {}
  }
}

const sfx = new SoundFX()

interface Obstacle {
  x: number
  y: number
  width: number
  height: number
  type: 'bug' | 'error404' | 'leak'
  speed: number
}

interface Item {
  x: number
  y: number
  size: number
  type: 'react' | 'ts' | 'next'
  speed: number
  collected?: boolean
}

export function OfflineGameOverlay() {
  const [isOffline, setIsOffline] = useState(false)
  const [showOverlay, setShowOverlay] = useState(false)
  const [isReconnected, setIsReconnected] = useState(false)
  const [isSoundOn, setIsSoundOn] = useState(true)
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'gameover'>('idle')
  const [score, setScore] = useState(0)
  const [highScore, setHighScore] = useState(0)

  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const requestRef = useRef<number | null>(null)

  // Game Engine State Refs
  const playerRef = useRef({
    x: 60,
    y: 200,
    vy: 0,
    width: 38,
    height: 38,
    groundY: 200,
    isJumping: false,
    trail: [] as { x: number; y: number; alpha: number }[],
  })
  const obstaclesRef = useRef<Obstacle[]>([])
  const itemsRef = useRef<Item[]>([])
  const gameSpeedRef = useRef(5)
  const frameCountRef = useRef(0)
  const scoreRef = useRef(0)

  // Load high score
  useEffect(() => {
    try {
      const saved = localStorage.getItem('jay_offline_highscore')
      if (saved) setHighScore(parseInt(saved, 10))
    } catch {}
  }, [])

  // Listen for real online / offline events
  useEffect(() => {
    const handleOnline = () => {
      setIsOffline(false)
      setIsReconnected(true)
    }

    const handleOffline = () => {
      setIsOffline(true)
      setShowOverlay(true)
      setIsReconnected(false)
    }

    // Shortcut to test offline game manually without disconnecting internet: Ctrl+Shift+O
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'O' || e.key === 'o')) {
        e.preventDefault()
        setShowOverlay((prev) => !prev)
        if (!showOverlay) {
          setIsOffline(true)
          setIsReconnected(false)
        }
      }
    }

    // Initial check
    if (typeof window !== 'undefined' && !navigator.onLine) {
      handleOffline()
    }

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [showOverlay])

  // Jump trigger
  const triggerJump = () => {
    if (gameState === 'idle') {
      startGame()
      return
    }
    if (gameState === 'gameover') {
      startGame()
      return
    }

    const player = playerRef.current
    if (!player.isJumping) {
      player.vy = -12
      player.isJumping = true
      if (isSoundOn) sfx.jump()
    }
  }

  // Keyboard controls
  useEffect(() => {
    if (!showOverlay) return

    const onKey = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.code === 'ArrowUp') {
        e.preventDefault()
        triggerJump()
      }
    }

    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [showOverlay, gameState, isSoundOn])

  // Start / Reset Game
  const startGame = () => {
    setGameState('playing')
    setScore(0)
    scoreRef.current = 0
    gameSpeedRef.current = 5.5
    frameCountRef.current = 0
    obstaclesRef.current = []
    itemsRef.current = []

    const canvas = canvasRef.current
    const groundY = canvas ? canvas.height - 70 : 200
    playerRef.current = {
      x: 60,
      y: groundY,
      vy: 0,
      width: 38,
      height: 38,
      groundY,
      isJumping: false,
      trail: [],
    }
  }

  // Main Game Loop
  useEffect(() => {
    if (!showOverlay) return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas dimensions
    const resize = () => {
      const parent = canvas.parentElement
      if (parent) {
        canvas.width = parent.clientWidth
        canvas.height = Math.min(360, parent.clientHeight || 360)
        playerRef.current.groundY = canvas.height - 70
        if (!playerRef.current.isJumping) {
          playerRef.current.y = playerRef.current.groundY
        }
      }
    }
    resize()
    window.addEventListener('resize', resize)

    const loop = () => {
      frameCountRef.current++
      const width = canvas.width
      const height = canvas.height
      const groundY = height - 70

      // Clear Canvas
      ctx.clearRect(0, 0, width, height)

      // Cyber Grid Background
      ctx.strokeStyle = 'rgba(168, 85, 247, 0.08)'
      ctx.lineWidth = 1
      const gridOffset = (frameCountRef.current * 1.5) % 40
      for (let x = -gridOffset; x < width; x += 40) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, height)
        ctx.stroke()
      }

      // Ground Line (Neon Cyan)
      const grad = ctx.createLinearGradient(0, 0, width, 0)
      grad.addColorStop(0, '#06b6d4')
      grad.addColorStop(0.5, '#a855f7')
      grad.addColorStop(1, '#ec4899')
      ctx.strokeStyle = grad
      ctx.lineWidth = 3
      ctx.beginPath()
      ctx.moveTo(0, groundY + 38)
      ctx.lineTo(width, groundY + 38)
      ctx.stroke()

      // Ground tech dashes
      ctx.fillStyle = 'rgba(255, 255, 255, 0.2)'
      const dashOffset = (frameCountRef.current * gameSpeedRef.current) % 60
      for (let dx = -dashOffset; dx < width; dx += 60) {
        ctx.fillRect(dx, groundY + 44, 25, 3)
      }

      const player = playerRef.current

      // Game Physics if Playing
      if (gameState === 'playing') {
        // Gravity
        player.vy += 0.65
        player.y += player.vy

        if (player.y >= groundY) {
          player.y = groundY
          player.vy = 0
          player.isJumping = false
        }

        // Particle trail
        if (frameCountRef.current % 3 === 0) {
          player.trail.push({ x: player.x - 10, y: player.y + 16, alpha: 0.6 })
        }
        player.trail.forEach((t) => {
          t.x -= gameSpeedRef.current * 0.7
          t.alpha -= 0.04
        })
        player.trail = player.trail.filter((t) => t.alpha > 0)

        // Increase score & speed over time
        if (frameCountRef.current % 6 === 0) {
          scoreRef.current += 1
          setScore(scoreRef.current)
          if (scoreRef.current > highScore) {
            setHighScore(scoreRef.current)
            try {
              localStorage.setItem('jay_offline_highscore', scoreRef.current.toString())
            } catch {}
          }
        }

        // Gradually speed up
        if (frameCountRef.current % 400 === 0 && gameSpeedRef.current < 11) {
          gameSpeedRef.current += 0.4
        }

        // Spawn Obstacles (Bugs)
        if (frameCountRef.current % Math.max(70, Math.floor(130 - gameSpeedRef.current * 5)) === 0) {
          const types: ('bug' | 'error404' | 'leak')[] = ['bug', 'error404', 'leak']
          const chosen = types[Math.floor(Math.random() * types.length)]
          obstaclesRef.current.push({
            x: width + 20,
            y: groundY + (chosen === 'leak' ? 10 : 4),
            width: chosen === 'error404' ? 44 : 32,
            height: chosen === 'leak' ? 26 : 34,
            type: chosen,
            speed: gameSpeedRef.current,
          })
        }

        // Spawn Framework Coins (+Points)
        if (frameCountRef.current % 180 === 0) {
          const itemTypes: ('react' | 'ts' | 'next')[] = ['react', 'ts', 'next']
          itemsRef.current.push({
            x: width + 30,
            y: groundY - (Math.random() > 0.5 ? 40 : 15),
            size: 24,
            type: itemTypes[Math.floor(Math.random() * itemTypes.length)],
            speed: gameSpeedRef.current,
          })
        }

        // Move Obstacles & Collision Check
        for (let i = obstaclesRef.current.length - 1; i >= 0; i--) {
          const obs = obstaclesRef.current[i]
          obs.x -= gameSpeedRef.current

          // Hitbox collision
          const padding = 6
          if (
            player.x + padding < obs.x + obs.width &&
            player.x + player.width - padding > obs.x &&
            player.y + padding < obs.y + obs.height &&
            player.y + player.height - padding > obs.y
          ) {
            // Collision!
            if (isSoundOn) sfx.hit()
            setGameState('gameover')
          }

          if (obs.x < -60) {
            obstaclesRef.current.splice(i, 1)
          }
        }

        // Move Items & Collection Check
        for (let j = itemsRef.current.length - 1; j >= 0; j--) {
          const item = itemsRef.current[j]
          item.x -= gameSpeedRef.current

          // Collect collision
          if (
            !item.collected &&
            player.x < item.x + item.size &&
            player.x + player.width > item.x &&
            player.y < item.y + item.size &&
            player.y + player.height > item.y
          ) {
            item.collected = true
            scoreRef.current += 25
            setScore(scoreRef.current)
            if (isSoundOn) sfx.collect()
            itemsRef.current.splice(j, 1)
          } else if (item.x < -40) {
            itemsRef.current.splice(j, 1)
          }
        }
      }

      // Draw Player Trail
      player.trail.forEach((t) => {
        ctx.fillStyle = `rgba(168, 85, 247, ${t.alpha})`
        ctx.beginPath()
        ctx.arc(t.x, t.y, 6, 0, Math.PI * 2)
        ctx.fill()
      })

      // Draw Player (Cyber Cyberpunk Drone / Runner)
      ctx.save()
      ctx.translate(player.x, player.y)

      // Outer Glow
      ctx.shadowColor = '#a855f7'
      ctx.shadowBlur = 12
      ctx.fillStyle = '#9333ea'
      ctx.beginPath()
      ctx.roundRect(0, 0, player.width, player.height, [8])
      ctx.fill()

      // Inner Core Visor
      ctx.fillStyle = '#06b6d4'
      ctx.shadowColor = '#06b6d4'
      ctx.shadowBlur = 8
      ctx.fillRect(8, 8, player.width - 16, 12)

      // Pulse Jet at the bottom
      if (player.isJumping) {
        ctx.fillStyle = '#ec4899'
        ctx.beginPath()
        ctx.moveTo(player.width / 2 - 8, player.height)
        ctx.lineTo(player.width / 2 + 8, player.height)
        ctx.lineTo(player.width / 2, player.height + 14)
        ctx.closePath()
        ctx.fill()
      }
      ctx.restore()

      // Draw Obstacles
      obstaclesRef.current.forEach((obs) => {
        ctx.save()
        ctx.translate(obs.x, obs.y)
        ctx.shadowBlur = 10

        if (obs.type === 'bug') {
          // Red Neon Bug
          ctx.shadowColor = '#ef4444'
          ctx.fillStyle = '#dc2626'
          ctx.beginPath()
          ctx.roundRect(0, 4, obs.width, obs.height - 4, [6])
          ctx.fill()
          // Text
          ctx.fillStyle = '#ffffff'
          ctx.font = 'bold 10px monospace'
          ctx.fillText('BUG', 6, 20)
        } else if (obs.type === 'error404') {
          // Orange 404 block
          ctx.shadowColor = '#f97316'
          ctx.fillStyle = '#ea580c'
          ctx.beginPath()
          ctx.roundRect(0, 0, obs.width, obs.height, [6])
          ctx.fill()
          ctx.fillStyle = '#ffffff'
          ctx.font = 'bold 11px monospace'
          ctx.fillText('404', 10, 22)
        } else {
          // Purple Spike
          ctx.shadowColor = '#d946ef'
          ctx.fillStyle = '#c026d3'
          ctx.beginPath()
          ctx.moveTo(obs.width / 2, 0)
          ctx.lineTo(obs.width, obs.height)
          ctx.lineTo(0, obs.height)
          ctx.closePath()
          ctx.fill()
        }
        ctx.restore()
      })

      // Draw Collectibles
      itemsRef.current.forEach((item) => {
        ctx.save()
        ctx.translate(item.x, item.y)
        ctx.shadowBlur = 12

        if (item.type === 'react') {
          ctx.shadowColor = '#38bdf8'
          ctx.fillStyle = '#0284c7'
          ctx.beginPath()
          ctx.arc(item.size / 2, item.size / 2, item.size / 2, 0, Math.PI * 2)
          ctx.fill()
          ctx.fillStyle = '#ffffff'
          ctx.font = 'bold 9px sans-serif'
          ctx.fillText('⚛', 6, 16)
        } else if (item.type === 'ts') {
          ctx.shadowColor = '#3b82f6'
          ctx.fillStyle = '#2563eb'
          ctx.fillRect(0, 0, item.size, item.size)
          ctx.fillStyle = '#ffffff'
          ctx.font = 'bold 10px sans-serif'
          ctx.fillText('TS', 5, 17)
        } else {
          ctx.shadowColor = '#ec4899'
          ctx.fillStyle = '#db2777'
          ctx.beginPath()
          ctx.arc(item.size / 2, item.size / 2, item.size / 2, 0, Math.PI * 2)
          ctx.fill()
          ctx.fillStyle = '#ffffff'
          ctx.font = 'bold 10px sans-serif'
          ctx.fillText('▲', 7, 16)
        }
        ctx.restore()
      })

      requestRef.current = requestAnimationFrame(loop)
    }

    requestRef.current = requestAnimationFrame(loop)

    return () => {
      window.removeEventListener('resize', resize)
      if (requestRef.current) cancelAnimationFrame(requestRef.current)
    }
  }, [showOverlay, gameState, isSoundOn, highScore])

  return (
    <>
      {/* Floating Offline Quick Launcher Pill (Visible so you can test it anytime!) */}
      <div className="fixed bottom-6 left-6 z-40">
        <button
          onClick={() => setShowOverlay(true)}
          className="group flex items-center gap-2 px-3 py-1.5 rounded-full bg-card/80 hover:bg-card border border-white/10 hover:border-primary/40 text-xs text-muted-foreground hover:text-foreground backdrop-blur-xl shadow-lg transition-all duration-300 active:scale-95"
          title="Click to play Jay's Offline Cyber Runner game anytime!"
        >
          <span className="relative flex h-2 w-2">
            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${isOffline ? 'bg-red-400' : 'bg-emerald-400'} opacity-75`} />
            <span className={`relative inline-flex rounded-full h-2 w-2 ${isOffline ? 'bg-red-500' : 'bg-emerald-500'}`} />
          </span>
          <span className="font-mono text-[11px]">🎮 Offline Game</span>
          <span className="hidden sm:inline-block px-1.5 py-0.2 rounded bg-white/5 border border-white/10 text-[9px] text-muted-foreground/80">Ctrl+Shift+O</span>
        </button>
      </div>

      {/* Main Full-Screen Game Modal */}
      <AnimatePresence>
        {showOverlay && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-2xl"
          >
            {/* Modal Card */}
            <div className="relative w-full max-w-3xl rounded-3xl bg-zinc-950/90 border border-purple-500/30 shadow-[0_0_50px_rgba(168,85,247,0.15)] overflow-hidden flex flex-col">
              
              {/* Online Restored Top Banner */}
              {isReconnected && (
                <div className="bg-emerald-500/20 border-b border-emerald-500/30 px-4 py-2 flex items-center justify-between text-xs text-emerald-300">
                  <div className="flex items-center gap-2 font-medium">
                    <Wifi className="w-4 h-4 text-emerald-400 animate-pulse" />
                    <span>🟢 Internet is Back! Connection restored.</span>
                  </div>
                  <button
                    onClick={() => setShowOverlay(false)}
                    className="underline hover:text-white font-semibold transition-colors"
                  >
                    Return to Portfolio →
                  </button>
                </div>
              )}

              {/* Game Top Bar */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-white/[0.02]">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-400">
                    <WifiOff className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
                      Jay&apos;s Cyber Bug Runner
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-purple-500/10 text-purple-400 border border-purple-500/20">
                        OFFLINE ARCADE
                      </span>
                    </h3>
                    <p className="text-[11px] text-muted-foreground">
                      {isOffline ? "Connection lost! Play while your Wi-Fi reconnects." : "Secret offline simulator mode active."}
                    </p>
                  </div>
                </div>

                {/* Score & Controls */}
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-3 font-mono text-xs">
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Trophy className="w-3.5 h-3.5 text-yellow-500" />
                      <span>HI: {highScore}</span>
                    </div>
                    <div className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-primary font-bold">
                      SCORE: {score}
                    </div>
                  </div>

                  <button
                    onClick={() => setIsSoundOn(!isSoundOn)}
                    className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors"
                    title={isSoundOn ? "Mute Sound" : "Enable Sound"}
                  >
                    {isSoundOn ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 text-red-400" />}
                  </button>

                  <button
                    onClick={() => setShowOverlay(false)}
                    className="p-2 rounded-xl bg-white/5 hover:bg-red-500/20 text-muted-foreground hover:text-red-400 transition-colors"
                    title="Close Game Overlay"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Game Viewport Area */}
              <div
                onClick={triggerJump}
                className="relative w-full h-[320px] sm:h-[360px] bg-gradient-to-b from-zinc-950 via-zinc-900/60 to-black cursor-pointer select-none overflow-hidden"
              >
                <canvas ref={canvasRef} className="w-full h-full block" />

                {/* Idle / Start State Overlay */}
                {gameState === 'idle' && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 backdrop-blur-[2px] p-6 text-center">
                    <div className="w-14 h-14 rounded-2xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-400 mb-4 animate-bounce">
                      <Play className="w-6 h-6 ml-0.5" />
                    </div>
                    <h4 className="text-xl font-bold text-foreground mb-1">
                      Ready to Run, Jay?
                    </h4>
                    <p className="text-sm text-muted-foreground mb-6 max-w-sm">
                      Dodge <span className="text-red-400 font-semibold">Bugs & 404s</span>, collect <span className="text-cyan-400 font-semibold">React & TS coins</span>!
                    </p>
                    <Button
                      onClick={startGame}
                      className="rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-6 shadow-lg shadow-primary/30"
                    >
                      Press Space or Tap to Jump
                    </Button>
                  </div>
                )}

                {/* Game Over Overlay */}
                {gameState === 'gameover' && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm p-6 text-center">
                    <div className="inline-block px-3 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-mono font-semibold mb-3">
                      💥 UNHANDLED EXCEPTION IN PRODUCTION
                    </div>
                    <h4 className="text-2xl font-extrabold text-foreground mb-2">
                      Bug Crashed The Build!
                    </h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      Final Score: <span className="text-foreground font-bold font-mono">{score}</span> | High Score: <span className="text-yellow-400 font-bold font-mono">{highScore}</span>
                    </p>
                    <div className="flex gap-3">
                      <Button
                        onClick={startGame}
                        className="rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-6 shadow-lg shadow-primary/30 flex items-center gap-2"
                      >
                        <RotateCcw className="w-4 h-4" /> Restart Hotfix
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => setShowOverlay(false)}
                        className="rounded-xl border-white/10 hover:bg-white/5 text-foreground"
                      >
                        Minimize
                      </Button>
                    </div>
                  </div>
                )}

                {/* In-Game Touch Jump Hint on Mobile */}
                {gameState === 'playing' && (
                  <div className="absolute bottom-3 right-4 pointer-events-none text-[11px] text-muted-foreground/60 font-mono">
                    [SPACE] or [TAP] to Jump
                  </div>
                )}
              </div>

              {/* Bottom Instructions / Easter Egg info */}
              <div className="px-6 py-3 border-t border-white/5 bg-white/[0.01] flex items-center justify-between text-xs text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                  <span>High Score automatically saved to browser storage.</span>
                </div>
                <div className="font-mono text-[11px]">
                  Built by Jay Kamble ⚡
                </div>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
