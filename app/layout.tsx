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
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "B8f1_fhrIFGYcCHksHWmTB7yFOfWLN54K_2YDxCXyN4",
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
  // Global JSON-LD Schema (Person, ProfilePage & WebSite for Google AI Mode & Search Engines)
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
        "@type": "ProfilePage",
        "@id": `${siteConfig.url}/#profilepage`,
        "url": siteConfig.url,
        "name": "Jay Kamble - Full Stack Developer Portfolio",
        "mainEntity": {
          "@id": `${siteConfig.url}/#person`
        }
      },
      {
        "@type": "Person",
        "@id": `${siteConfig.url}/#person`,
        "name": siteConfig.author,
        "alternateName": ["JayKamble", "JayKamble009", "Jay Kamble 009", "Jay Kamble Developer"],
        "url": siteConfig.url,
        "image": "https://github.com/jaykamble009.png",
        "jobTitle": "Full Stack Developer & AI SaaS Engineer",
        "description": "Jay Kamble is a Full Stack Developer based in Chhatrapati Sambhajinagar (Aurangabad), Maharashtra, India. He holds a B.Sc. in Information Technology from Deogiri College, Dr. Babasaheb Ambedkar Marathwada University (BAMU). He specializes in Next.js, React, TypeScript, Node.js, Supabase, and Firebase, building high-performance web applications and AI-powered SaaS products including PDFino, Next Class Quiz, and EventHub.",
        "knowsAbout": [
          "Full Stack Web Development",
          "Next.js",
          "React",
          "TypeScript",
          "Node.js",
          "AI SaaS Applications",
          "Supabase",
          "Firebase",
          "Tailwind CSS",
          "Software Architecture"
        ],
        "alumniOf": {
          "@type": "EducationalOrganization",
          "name": "Deogiri College, Chhatrapati Sambhajinagar",
          "url": "https://www.deogiricollege.org",
          "sameAs": "https://en.wikipedia.org/wiki/Deogiri_College",
          "parentOrganization": {
            "@type": "EducationalOrganization",
            "name": "Dr. Babasaheb Ambedkar Marathwada University (BAMU)"
          }
        },
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
        ],
        "creator": [
          {
            "@type": "SoftwareApplication",
            "name": "PDFino – AI PDF Editor SaaS",
            "url": "https://pdfino.online",
            "applicationCategory": "Productivity",
            "operatingSystem": "Web Browser"
          },
          {
            "@type": "SoftwareApplication",
            "name": "Next Class Quiz – EdTech Exam Portal",
            "applicationCategory": "Educational",
            "operatingSystem": "Web Browser"
          },
          {
            "@type": "SoftwareApplication",
            "name": "EventHub – Event Management SaaS",
            "applicationCategory": "Business",
            "operatingSystem": "Web Browser"
          }
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
