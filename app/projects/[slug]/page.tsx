import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { siteConfig } from '@/lib/config'
import projectsData from '@/data/projects.json'
import Link from 'next/link'
import { ChevronLeft, ExternalLink, Github } from 'lucide-react'
import { Button } from '@/components/ui/button'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return projectsData.map((project) => ({
    slug: project.id,
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params
  const project = projectsData.find((p) => p.id === resolvedParams.slug)
  
  if (!project) {
    return {}
  }

  return {
    title: project.title,
    description: project.description,
    alternates: {
      canonical: `/projects/${project.id}`,
    },
    openGraph: {
      title: `${project.title} | Jay Kamble`,
      description: project.description,
      url: `${siteConfig.url}/projects/${project.id}`,
      images: [
        {
          url: `/og/${project.id}.png`,
          width: 1200,
          height: 630,
          alt: `${project.title} Dashboard`,
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: `${project.title} | Jay Kamble`,
      description: project.description,
      images: [`/og/${project.id}.png`],
    }
  }
}

import { ProjectCaseStudy } from '@/components/project-case-study'

export default async function ProjectPage({ params }: Props) {
  const resolvedParams = await params
  const project = projectsData.find((p) => p.id === resolvedParams.slug)

  if (!project) {
    notFound()
  }

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": project.title,
      "description": project.description,
      "applicationCategory": "WebApplication",
      "operatingSystem": "Any",
      "author": {
        "@id": `${siteConfig.url}/#person`
      },
      "url": `${siteConfig.url}/projects/${project.id}`,
      "image": `${siteConfig.url}/og/${project.id}.png`
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": siteConfig.url
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Projects",
          "item": `${siteConfig.url}/#projects`
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": project.title,
          "item": `${siteConfig.url}/projects/${project.id}`
        }
      ]
    }
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProjectCaseStudy project={project} />
    </>
  )
}
