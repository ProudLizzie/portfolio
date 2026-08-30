import { SiteNav } from '@/components/site-nav'
import { SiteFooter } from '@/components/site-footer'
import { Hero } from '@/components/home/hero'
import { AboutMe } from '@/components/home/about-me'
import { FeaturedProjects } from '@/components/home/featured-projects'
import { GalleryWall } from '@/components/home/gallery-wall'

export default function HomePage() {
  return (
    <>
      <SiteNav />
      <main>
        <Hero />
        <AboutMe />
        <FeaturedProjects />
        <GalleryWall />
      </main>
      <SiteFooter />
    </>
  )
}
