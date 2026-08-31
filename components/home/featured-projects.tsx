import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { NaturalImage } from '@/components/natural-image'
import { projects } from '@/lib/portfolio-data'

export function FeaturedProjects() {
  const featured = projects.filter((p) => p.category === 'Key')

  return (
    <section id="featured" className="scroll-mt-20 border-t border-border/60 bg-card/40">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <p className="font-serif text-sm uppercase tracking-[0.2em] text-primary">
              Selected Work
            </p>
            <h2 className="mt-3 text-balance font-serif text-4xl font-semibold text-foreground md:text-5xl">
              Key projects
            </h2>
          </div>
          <Link
            href="/projects"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary/80"
          >
            View full archive
            <ArrowUpRight className="size-4" />
          </Link>
        </div>

        <div className="mt-14 flex flex-col gap-16 md:gap-24">
          {featured.map((project, i) => (
            <article
              key={project.slug}
              className="group grid items-center gap-8 md:grid-cols-2 md:gap-14"
            >
              <Link
                href={`/projects/${project.slug}`}
                className={`block overflow-hidden rounded-3xl border border-border shadow-sm ${
                  i % 2 === 1 ? 'md:order-2' : ''
                }`}
              >
                <NaturalImage
                  src={project.image}
                  alt={project.title}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="transition-transform duration-500 group-hover:scale-105"
                />
              </Link>

              <div className={i % 2 === 1 ? 'md:order-1' : ''}>
                <span className="text-sm text-muted-foreground">
                  {String(i + 1).padStart(2, '0')} / {project.year}
                </span>
                <Link href={`/projects/${project.slug}`}>
                  <h3 className="mt-2 font-serif text-3xl font-semibold text-foreground transition-colors hover:text-primary">
                    {project.title}
                  </h3>
                </Link>
                <p className="mt-3 max-w-md text-pretty leading-relaxed text-muted-foreground">
                  {project.description}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <Link
                  href={`/projects/${project.slug}`}
                  className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary/80"
                >
                  View Project
                  <ArrowUpRight className="size-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
