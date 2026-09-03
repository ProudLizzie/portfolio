import Link from 'next/link'
import { ArrowUpRight, Hammer } from 'lucide-react'
import { NaturalImage } from '@/components/natural-image'
import type { Project } from '@/lib/portfolio-data'
import { cn } from '@/lib/utils'

export function ProjectCard({
  project,
  className,
}: {
  project: Project
  className?: string
}) {
  // WIP projects are informational, not actionable: they render as a static
  // card with no link and no "View Project" affordance until they graduate to
  // a finished category and get their own detail page.
  const isWip = project.category === 'WIP'

  const inner = (
    <>
      <div className="relative overflow-hidden">
        {isWip ? (
          <div className="flex aspect-[4/3] flex-col items-center justify-center gap-3 bg-secondary">
            <Hammer className="size-8 text-secondary-foreground/60" aria-hidden />
            <span className="font-serif text-xs uppercase tracking-[0.18em] text-secondary-foreground/70">
              Work in Progress
            </span>
          </div>
        ) : (
          <NaturalImage
            src={project.image}
            alt={project.title}
            sizes="(max-width: 768px) 100vw, 33vw"
            className="transition-transform duration-500 group-hover:scale-105"
          />
        )}
        <span className="absolute left-3 top-3 rounded-full bg-background/90 px-3 py-1 text-xs font-medium text-primary backdrop-blur">
          {isWip ? 'In Progress' : project.category}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-serif text-xl font-semibold text-foreground">
            {project.title}
          </h3>
          <span className="mt-1 shrink-0 text-xs text-muted-foreground">{project.year}</span>
        </div>
        <p className="mt-2 leading-relaxed text-muted-foreground">{project.description}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground"
            >
              {tag}
            </span>
          ))}
        </div>
        {isWip ? (
          <span className="mt-6 inline-flex items-center gap-1.5 self-start text-sm font-medium text-muted-foreground">
            Work in progress
          </span>
        ) : (
          <span className="mt-6 inline-flex items-center gap-1.5 self-start text-sm font-medium text-primary transition-colors group-hover:text-primary/80">
            View Project
            <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </span>
        )}
      </div>
    </>
  )

  if (isWip) {
    return (
      <div
        className={cn(
          'flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm',
          className,
        )}
      >
        {inner}
      </div>
    )
  }

  return (
    <Link
      href={`/projects/${project.slug}`}
      className={cn(
        'group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all hover:-translate-y-1 hover:shadow-md',
        className,
      )}
    >
      {inner}
    </Link>
  )
}
