import { SiteNav } from '@/components/site-nav'
import { SiteFooter } from '@/components/site-footer'
import { Hero } from '@/components/home/hero'
import { AboutMe } from '@/components/home/about-me'
import { FeaturedProjects } from '@/components/home/featured-projects'
import { WorksInProgress } from '@/components/home/works-in-progress'
import { GalleryWall } from '@/components/home/gallery-wall'

export default function HomePage() {
  return (
    <>
      <SiteNav />
      <main>
        <Hero />
        <AboutMe />
        <FeaturedProjects />
        <WorksInProgress />
        <GalleryWall />
      </main>
      <SiteFooter />
    </>
  )
}
