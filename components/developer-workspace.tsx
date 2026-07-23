'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Terminal, Code2, Cpu, Database, Cloud } from 'lucide-react'

export function DeveloperWorkspace() {
  return (
    <div className="relative w-full py-4 lg:py-0 flex items-center justify-center perspective-[1000px]">
      {/* Glow effect behind */}
      <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-secondary/20 blur-3xl opacity-50 rounded-full" />

      {/* Floating Icons Background */}
      <motion.div
        animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-10 left-10 text-primary/40"
      >
        <Code2 size={40} />
      </motion.div>
      <motion.div
        animate={{ y: [0, 20, 0], rotate: [0, -10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute bottom-20 left-20 text-secondary/40"
      >
        <Database size={48} />
      </motion.div>
      <motion.div
        animate={{ y: [0, -15, 0], x: [0, 10, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        className="absolute top-32 right-10 text-accent/40"
      >
        <Cloud size={36} />
      </motion.div>

      {/* Main IDE Window */}
      <motion.div
        initial={{ rotateX: 20, rotateY: -15, scale: 0.9, opacity: 0 }}
        animate={{ rotateX: 0, rotateY: 0, scale: 1, opacity: 1 }}
        transition={{ duration: 1, type: 'spring', bounce: 0.4 }}
        className="relative z-10 w-full max-w-lg bg-[#0d1117] border border-white/10 rounded-xl shadow-2xl overflow-hidden backdrop-blur-xl"
      >
        {/* IDE Header */}
        <div className="bg-[#161b22] px-4 py-3 flex items-center gap-2 border-b border-white/5">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
          <div className="mx-auto text-xs text-muted-foreground font-mono flex items-center gap-2">
            <Cpu size={12} />
            <span>jay-portfolio — page.tsx</span>
          </div>
        </div>

        {/* IDE Content */}
        <div className="p-5 font-mono text-sm leading-relaxed overflow-hidden relative">
          <div className="text-gray-400 absolute left-2 top-5 flex flex-col items-end text-xs select-none pr-3 border-r border-white/5">
            {[1,2,3,4,5,6,7,8,9,10].map(n => <span key={n}>{n}</span>)}
          </div>
          
          <div className="pl-6">
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <span className="text-pink-400">import</span> {'{'} Developer {'}'} <span className="text-pink-400">from</span> <span className="text-green-300">'@jay/core'</span>;
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
            >
              <span className="text-pink-400">import</span> {'{'} Build, Ship {'}'} <span className="text-pink-400">from</span> <span className="text-green-300">'@jay/skills'</span>;
            </motion.div>
            <br />
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9 }}
            >
              <span className="text-purple-400">const</span> <span className="text-blue-300">Jay</span> = <span className="text-purple-400">new</span> <span className="text-yellow-300">Developer</span>({'{'}
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.1 }}
              className="pl-4"
            >
              role: <span className="text-green-300">'Full Stack & AI Engineer'</span>,
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.3 }}
              className="pl-4"
            >
              skills: [<span className="text-green-300">'React'</span>, <span className="text-green-300">'Next.js'</span>, <span className="text-green-300">'Python'</span>],
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.5 }}
              className="pl-4"
            >
              passion: <span className="text-green-300">'Building scalable SaaS'</span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.7 }}
            >
              {'}'});
            </motion.div>
            <br />
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.9 }}
            >
              <span className="text-blue-300">Jay</span>.<span className="text-yellow-300">execute</span>(<span className="text-blue-300">Build</span>).<span className="text-yellow-300">then</span>(<span className="text-blue-300">Ship</span>);
            </motion.div>
            <motion.div
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="inline-block w-2 h-4 bg-primary ml-1 translate-y-1"
            />
          </div>
        </div>

        {/* Terminal Panel */}
        <div className="bg-[#0a0a0a] border-t border-white/5 p-3 text-xs font-mono text-gray-400">
          <div className="flex items-center gap-2 mb-2">
            <Terminal size={12} className="text-primary" />
            <span className="uppercase font-semibold tracking-wider text-[10px]">Terminal</span>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.2 }}
          >
            <span className="text-green-400">➜</span> <span className="text-cyan-400">portfolio</span> <span className="text-gray-500">git:(main) ✗</span> npm run deploy
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3 }}
            className="text-gray-300 mt-1"
          >
            &gt; Compiling...<br/>
            &gt; Optimized production build generated.<br/>
            <span className="text-green-400">✔ Deployed successfully to Vercel.</span>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}
