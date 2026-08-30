import type { Metadata } from 'next'
import { SiteNav } from '@/components/site-nav'
import { SiteFooter } from '@/components/site-footer'
import { PageHeader } from '@/components/page-header'
import { ProjectArchive } from '@/components/projects/project-archive'

export const metadata: Metadata = {
  title: 'Projects — Elizabeth Janicek',
  description: 'A full archive of mechanical engineering projects across key, personal, school, and professional categories.',
}

type Filter = 'All' | 'Key' | 'Personal' | 'School' | 'Professional'
const validFilters: Filter[] = ['All', 'Key', 'Personal', 'School', 'Professional']

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>
}) {
  const { category } = await searchParams
  const initialFilter: Filter = validFilters.includes(category as Filter)
    ? (category as Filter)
    : 'All'

  return (
    <>
      <SiteNav />
      <main>
        <PageHeader
          eyebrow="Archive"
          title="All projects"
          description="A complete record of what I've designed, machined, and tested. Filter by category or sort to find your way around."
        />
        <section className="mx-auto max-w-6xl px-6 pb-24">
          <ProjectArchive initialFilter={initialFilter} />
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
