import React from 'react'

export interface CommandResponse {
  output: React.ReactNode | string
  action?: 'scroll' | 'theme' | 'link' | 'exit' | 'clear'
  payload?: string
}

const commandsMap: Record<string, () => CommandResponse> = {
  'help': () => ({
    output: (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 mt-2 mb-4">
        <div><span className="text-cyan-400 font-semibold w-24 inline-block">about</span> Who am I?</div>
        <div><span className="text-amber-400 font-semibold w-24 inline-block">neofetch</span> System info summary</div>
        <div><span className="text-cyan-400 font-semibold w-24 inline-block">version</span> OS version</div>
        <div><span className="text-cyan-400 font-semibold w-24 inline-block">social</span> View social links</div>
        <div><span className="text-cyan-400 font-semibold w-24 inline-block">projects</span> View my work</div>
        <div><span className="text-cyan-400 font-semibold w-24 inline-block">project [name]</span> View specific project</div>
        <div><span className="text-green-400 font-semibold w-24 inline-block">skills</span> Tech stack</div>
        <div><span className="text-cyan-400 font-semibold w-24 inline-block">education</span> Academic background</div>
        <div><span className="text-cyan-400 font-semibold w-24 inline-block">contact</span> Get in touch</div>
        <div><span className="text-cyan-400 font-semibold w-24 inline-block">resume</span> Download CV</div>
        <div><span className="text-cyan-400 font-semibold w-24 inline-block">github</span> View GitHub profile</div>
        <div><span className="text-cyan-400 font-semibold w-24 inline-block">linkedin</span> View LinkedIn profile</div>
        <div><span className="text-cyan-400 font-semibold w-24 inline-block">email</span> Send me an email</div>
        <div><span className="text-cyan-400 font-semibold w-24 inline-block">theme [mode]</span> dark, light, system</div>
        <div><span className="text-cyan-400 font-semibold w-24 inline-block">clear</span> Clear screen</div>
        <div><span className="text-cyan-400 font-semibold w-24 inline-block">history</span> View command history</div>
        <div><span className="text-cyan-400 font-semibold w-24 inline-block">exit</span> Close terminal</div>
      </div>
    )
  }),
  'whoami': () => ({
    output: (
      <div className="text-accent mt-2 mb-4">
        <span className="font-bold text-xl">Jay Kamble</span><br/>
        Full Stack Developer<br/>
        AI Builder<br/>
        SaaS Creator
      </div>
    )
  }),
  'version': () => ({
    output: 'jayOS v3.1.4 (Built with React, Next.js, and Framer Motion)'
  }),
  'social': () => ({
    output: (
      <div className="flex flex-col gap-2 mt-2 mb-4">
        <div><span className="text-muted-foreground w-24 inline-block">GitHub:</span> <a href="https://github.com/jaykamble009" target="_blank" className="text-primary hover:underline">github.com/jaykamble009</a></div>
        <div><span className="text-muted-foreground w-24 inline-block">LinkedIn:</span> <a href="https://linkedin.com/in/jaykamble" target="_blank" className="text-primary hover:underline">linkedin.com/in/jaykamble</a></div>
        <div><span className="text-muted-foreground w-24 inline-block">Email:</span> <a href="mailto:jk365242@gmail.com" className="text-primary hover:underline">jk365242@gmail.com</a></div>
      </div>
    )
  }),
  'neofetch': () => ({
    output: (
      <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start my-4">
        <div className="text-primary font-bold text-[10px] leading-[10px] sm:text-xs sm:leading-3 whitespace-pre">
{`    _  _
   | |/ /
   | ' /
   | . \\
   |_|\\_\\`}
        </div>
        <div className="flex-1 space-y-1">
          <div className="text-accent font-bold mb-2">jay@portfolio</div>
          <div className="h-px bg-white/20 w-full mb-2" />
          <div><span className="text-primary font-bold">Name:</span> Jay Kamble</div>
          <div><span className="text-primary font-bold">Role:</span> Full Stack Developer</div>
          <div><span className="text-primary font-bold">Location:</span> India</div>
          <div><span className="text-primary font-bold">Stack:</span> React • Next.js • TypeScript • Python</div>
          <div><span className="text-primary font-bold">Projects:</span> PDFino • ClassQuiz • Event Management</div>
          <div><span className="text-primary font-bold">GitHub:</span> <a href="https://github.com/jaykamble009" target="_blank" className="hover:underline">github.com/jaykamble009</a></div>
          <div className="flex gap-2 mt-3 pt-3">
            <div className="w-4 h-4 bg-black rounded-sm" />
            <div className="w-4 h-4 bg-red-500 rounded-sm" />
            <div className="w-4 h-4 bg-green-500 rounded-sm" />
            <div className="w-4 h-4 bg-yellow-500 rounded-sm" />
            <div className="w-4 h-4 bg-blue-500 rounded-sm" />
            <div className="w-4 h-4 bg-purple-500 rounded-sm" />
            <div className="w-4 h-4 bg-cyan-500 rounded-sm" />
            <div className="w-4 h-4 bg-white rounded-sm" />
          </div>
        </div>
      </div>
    )
  }),
  'about': () => ({
    output: 'Navigating to About section...',
    action: 'scroll',
    payload: '#about'
  }),
  'projects': () => ({
    output: 'Navigating to Projects section...',
    action: 'scroll',
    payload: '#projects'
  }),
  'project pdfino': () => ({
    output: 'Opening PDFino project details...',
    action: 'scroll',
    payload: '#pdfino'
  }),
  'project classquiz': () => ({
    output: 'Opening ClassQuiz project details...',
    action: 'scroll',
    payload: '#classquiz'
  }),
  'project event': () => ({
    output: 'Opening Event Management System project details...',
    action: 'scroll',
    payload: '#event-management-system'
  }),
  'skills': () => ({
    output: 'Navigating to Skills section...',
    action: 'scroll',
    payload: '#skills'
  }),
  'education': () => ({
    output: 'Navigating to Education section...',
    action: 'scroll',
    payload: '#education'
  }),
  'contact': () => ({
    output: 'Navigating to Contact section...',
    action: 'scroll',
    payload: '#contact'
  }),
  'resume': () => ({
    output: 'Downloading Resume...',
    action: 'link',
    payload: '/resume.pdf'
  }),
  'github': () => ({
    output: 'Opening GitHub Profile...',
    action: 'link',
    payload: 'https://github.com/jaykamble009'
  }),
  'linkedin': () => ({
    output: 'Opening LinkedIn Profile...',
    action: 'link',
    payload: 'https://linkedin.com/in/jaykamble'
  }),
  'email': () => ({
    output: 'Opening Mail Client...',
    action: 'link',
    payload: 'mailto:jk365242@gmail.com'
  }),
  'theme dark': () => ({
    output: 'Switching to Dark Theme...',
    action: 'theme',
    payload: 'dark'
  }),
  'theme light': () => ({
    output: 'Switching to Light Theme...',
    action: 'theme',
    payload: 'light'
  }),
  'theme system': () => ({
    output: 'Switching to System Theme...',
    action: 'theme',
    payload: 'system'
  }),
  'clear': () => ({
    output: '',
    action: 'clear'
  }),
  'pwd': () => ({
    output: '/home/visitor/portfolio'
  }),
  'ls': () => ({
    output: 'about.txt  projects.dir  skills.json  resume.pdf  contact.sh'
  }),
  'date': () => ({
    output: new Date().toString()
  }),
  'time': () => ({
    output: new Date().toLocaleTimeString()
  }),
  'exit': () => ({
    output: 'Goodbye!',
    action: 'exit'
  }),
  'history': () => ({
    output: 'Use Up/Down arrows to navigate history.'
  }),
  'hire jay': () => ({
    output: (
      <div className="my-4 p-4 border border-green-500/30 bg-green-500/10 rounded-lg">
        <h3 className="text-xl font-bold text-green-400 mb-2">✅ Thanks for your interest!</h3>
        <p className="mb-4 text-foreground">Let's build something amazing together.</p>
        <ul className="space-y-2">
          <li><span className="text-muted-foreground w-20 inline-block">Email:</span> <a href="mailto:jk365242@gmail.com" className="text-primary hover:underline">jk365242@gmail.com</a></li>
          <li><span className="text-muted-foreground w-20 inline-block">Resume:</span> <a href="/resume.pdf" target="_blank" className="text-primary hover:underline">Download</a></li>
          <li><span className="text-muted-foreground w-20 inline-block">LinkedIn:</span> <a href="https://linkedin.com/in/jaykamble" target="_blank" className="text-primary hover:underline">Profile</a></li>
          <li><span className="text-muted-foreground w-20 inline-block">GitHub:</span> <a href="https://github.com/jaykamble009" target="_blank" className="text-primary hover:underline">Profile</a></li>
        </ul>
      </div>
    )
  }),
  // Easter Eggs
  'matrix': () => ({
    output: (
      <div className="text-green-500 font-bold tracking-widest mt-2 mb-4 animate-pulse">
        Wake up, Neo...<br/>
        The Matrix has you...<br/>
        Follow the white rabbit.
      </div>
    )
  }),
  'coffee': () => ({
    output: (
      <pre className="text-yellow-600 mt-2 mb-4 font-mono">
{`      )  (
     (   ) )
      ) ( (
    .......
  .-'     '-.
 (           )
  '-.......-'`}
      </pre>
    )
  }),
  'sudo hire jay': () => ({
    output: <span className="text-accent font-bold">You are already a superuser in my eyes. Type 'hire jay' instead!</span>
  }),
  'sudo rm -rf /': () => ({
    output: <span className="text-destructive font-bold">Nice try! But I have backups. 😉</span>
  }),
  'hello': () => ({
    output: 'Hello there! Enjoy exploring.'
  }),
  'konami': () => ({
    output: '⬆ ⬆ ⬇ ⬇ ⬅ ➡ ⬅ ➡ B A START. Cheat activated (just kidding).'
  }),
  'fortune': () => {
    const fortunes = [
      "A bug in the code is worth two in the documentation.",
      "You will write excellent code today.",
      "Your next deploy will be flawless.",
      "Beware of missing semicolons.",
      "May the Force (and the Source) be with you."
    ];
    return { output: fortunes[Math.floor(Math.random() * fortunes.length)] };
  }
}

export const availableCommands = Object.keys(commandsMap)

export function executeCommand(cmd: string): CommandResponse {
  const normalizedCmd = cmd.trim().toLowerCase()
  if (!normalizedCmd) return { output: '' }
  
  if (commandsMap[normalizedCmd]) {
    return commandsMap[normalizedCmd]()
  }

  // Handle prefix commands (like theme)
  if (normalizedCmd.startsWith('theme ')) {
    return { output: 'Invalid theme. Use: theme light, theme dark, theme system' }
  }
  if (normalizedCmd.startsWith('project ')) {
    return { output: 'Project not found. Type projects to see available ones.' }
  }

  return {
    output: (
      <div className="text-destructive">
        Command not found: {cmd}. Type <span className="font-bold">help</span> for a list of available commands.
      </div>
    )
  }
}
