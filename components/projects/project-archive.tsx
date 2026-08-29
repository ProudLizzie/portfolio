'use client'

import { useMemo, useState } from 'react'
import { cn } from '@/lib/utils'
import { projects, type ProjectCategory } from '@/lib/portfolio-data'
import { ProjectCard } from '@/components/project-card'

type Filter = 'All' | ProjectCategory
type Sort = 'Newest' | 'Oldest' | 'A–Z'

const filters: Filter[] = ['All', 'Key', 'Personal', 'School', 'Work']

export function ProjectArchive() {
  const [filter, setFilter] = useState<Filter>('All')
  const [sort, setSort] = useState<Sort>('Newest')

  const visible = useMemo(() => {
    const list = projects.filter((p) => (filter === 'All' ? true : p.category === filter))
    return [...list].sort((a, b) => {
      if (sort === 'A–Z') return a.title.localeCompare(b.title)
      if (sort === 'Oldest') return Number(a.year) - Number(b.year)
      return Number(b.year) - Number(a.year)
    })
  }, [filter, sort])

  return (
    <div>
      <div className="flex flex-col gap-4 border-b border-border/60 pb-6 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className={cn(
                'rounded-full border px-4 py-2 text-sm font-medium transition-colors',
                filter === f
                  ? 'border-primary bg-primary text-primary-foreground'
                  : 'border-border bg-card text-muted-foreground hover:border-primary hover:text-primary',
              )}
            >
              {f}
            </button>
          ))}
        </div>

        <label className="flex items-center gap-2 text-sm text-muted-foreground">
          Sort
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as Sort)}
            className="rounded-lg border border-border bg-card px-3 py-2 text-sm text-foreground outline-none focus:border-primary"
          >
            <option>Newest</option>
            <option>Oldest</option>
            <option>A–Z</option>
          </select>
        </label>
      </div>

      <p className="mt-6 text-sm text-muted-foreground">
        Showing {visible.length} {visible.length === 1 ? 'project' : 'projects'}
      </p>

      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </div>
  )
}
