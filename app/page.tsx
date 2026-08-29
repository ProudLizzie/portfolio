import { SiteNav } from '@/components/site-nav'
import { SiteFooter } from '@/components/site-footer'
import { Hero } from '@/components/home/hero'
import { FeaturedProjects } from '@/components/home/featured-projects'
import { SmallerBuilds } from '@/components/home/smaller-builds'
import { AboutSnippet } from '@/components/home/about-snippet'

export default function HomePage() {
  return (
    <>
      <SiteNav />
      <main>
        <Hero />
        <FeaturedProjects />
        <SmallerBuilds />
        <AboutSnippet />
      </main>
      <SiteFooter />
    </>
  )
}
