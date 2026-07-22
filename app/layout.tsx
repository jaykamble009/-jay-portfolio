import type { Metadata, Viewport } from "next"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { ScrollProgress } from "@/components/scroll-progress"
import { TerminalProvider } from "@/components/terminal-provider"
import { siteConfig } from "@/lib/config"
import { Toaster } from "sonner"

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | Jay Kamble`
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [{ name: siteConfig.author, url: siteConfig.url }],
  creator: siteConfig.creator,
  publisher: siteConfig.creator,
  applicationName: "Jay Kamble Portfolio",
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
    creator: '@jaykamble',
  },
  verification: {
    google: "google-site-verification-placeholder",
  }
}
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#09090b" },
  ],
}

import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // Global JSON-LD Schema (Person & Website)
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${siteConfig.url}/#website`,
        "url": siteConfig.url,
        "name": siteConfig.name,
        "description": siteConfig.description,
        "publisher": {
          "@id": `${siteConfig.url}/#person`
        }
      },
      {
        "@type": "Person",
        "@id": `${siteConfig.url}/#person`,
        "name": siteConfig.author,
        "alternateName": ["JayKamble", "JayKamble009"],
        "url": siteConfig.url,
        "jobTitle": "Full Stack Developer",
        "description": "Software Engineer & Modern Web Developer",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Chhatrapati Sambhajinagar",
          "addressRegion": "Maharashtra",
          "addressCountry": "India"
        },
        "sameAs": [
          siteConfig.links.github,
          siteConfig.links.linkedin,
          siteConfig.links.twitter
        ]
      }
    ]
  }

  return (
    <html lang="en" suppressHydrationWarning className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased bg-background text-foreground selection:bg-primary/30 selection:text-primary">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {/* Subtle Global Noise Texture */}
          <div className="pointer-events-none fixed inset-0 z-[100] h-full w-full opacity-[0.015] mix-blend-difference" style={{ backgroundImage: "url('/noise.svg')" }}></div>
          
          <ScrollProgress />
          <TerminalProvider>
            {children}
            <Toaster position="bottom-center" theme="system" />
          </TerminalProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
