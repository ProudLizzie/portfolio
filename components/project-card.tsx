import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import type { Project } from '@/lib/portfolio-data'
import { cn } from '@/lib/utils'

export function ProjectCard({
  project,
  className,
}: {
  project: Project
  className?: string
}) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className={cn(
        'group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all hover:-translate-y-1 hover:shadow-md',
        className,
      )}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={project.image || '/placeholder.svg'}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <span className="absolute left-3 top-3 rounded-full bg-background/90 px-3 py-1 text-xs font-medium text-primary backdrop-blur">
          {project.category}
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
        <span className="mt-6 inline-flex items-center gap-1.5 self-start text-sm font-medium text-primary transition-colors group-hover:text-primary/80">
          View Project
          <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  )
}
