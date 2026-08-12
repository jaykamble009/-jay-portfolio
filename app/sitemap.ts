import { MetadataRoute } from 'next'
import { siteConfig } from '@/lib/config'
import projectsData from '@/data/projects.json'

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    '',
    '/privacy',
    '/terms'
  ].map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  const projectRoutes = projectsData.map((project) => ({
    url: `${siteConfig.url}/projects/${project.id}`,
    lastModified: new Date().toISOString().split('T')[0],
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }))

  return [...routes, ...projectRoutes]
}
