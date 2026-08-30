import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { SiteNav } from '@/components/site-nav'
import { SiteFooter } from '@/components/site-footer'
import { getDetailProjects, getProject, type ProjectBlock } from '@/lib/portfolio-data'

export function generateStaticParams() {
  return getDetailProjects().map((project) => ({ slug: project.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) return { title: 'Project Not Found' }
  return {
    title: `${project.title} — Elizabeth Janicek`,
    description: project.description,
  }
}

function ContentBlock({ block, title }: { block: ProjectBlock; title: string }) {
  if (block.type === 'text') {
    return (
      <p className="text-pretty text-lg leading-relaxed text-muted-foreground">
        {block.text}
      </p>
    )
  }

  if (block.type === 'image') {
    return (
      <figure>
        <div className="relative aspect-[16/9] overflow-hidden rounded-2xl border border-border shadow-sm">
          <Image
            src={block.src || '/placeholder.svg'}
            alt={block.caption ? block.caption : title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 720px"
          />
        </div>
        {block.caption && (
          <figcaption className="mt-3 text-sm text-muted-foreground">
            {block.caption}
          </figcaption>
        )}
      </figure>
    )
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {block.images.map((img, i) => (
        <figure key={img.src + i}>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border shadow-sm">
            <Image
              src={img.src || '/placeholder.svg'}
              alt={img.caption ? img.caption : `${title} — photo ${i + 1}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 360px"
            />
          </div>
          {img.caption && (
            <figcaption className="mt-3 text-sm text-muted-foreground">
              {img.caption}
            </figcaption>
          )}
        </figure>
      ))}
    </div>
  )
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const project = getProject(slug)

  // WIP projects are status updates without a full write-up, so they have no
  // detail page. They gain one automatically once their category changes.
  if (!project || project.category === 'WIP') {
    notFound()
  }

  const detailProjects = getDetailProjects()
  const index = detailProjects.findIndex((p) => p.slug === project.slug)
  const prev = index > 0 ? detailProjects[index - 1] : null
  const next = index < detailProjects.length - 1 ? detailProjects[index + 1] : null

  return (
    <>
      <SiteNav />
      <main>
        <div className="mx-auto max-w-5xl px-6 pt-28 md:pt-32">
          <Link
            href="/projects"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft className="size-4" />
            Back to projects
          </Link>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
              {project.category}
            </span>
            <span className="text-sm text-muted-foreground">{project.year}</span>
          </div>

          <h1 className="mt-4 text-balance font-serif text-4xl font-semibold text-foreground md:text-5xl">
            {project.title}
          </h1>
        </div>

        <div className="mx-auto mt-10 max-w-5xl px-6">
          <div className="relative aspect-[16/9] overflow-hidden rounded-3xl border border-border shadow-sm">
            <Image
              src={project.image || '/placeholder.svg'}
              alt={project.title}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 960px"
            />
          </div>
        </div>

        <div className="mx-auto max-w-5xl px-6 py-16">
          <div className="grid gap-12 lg:grid-cols-[1fr_260px] lg:gap-16">
            {/* Main write-up: freely composed content blocks */}
            <article className="min-w-0 space-y-8">
              {project.blocks.map((block, i) => (
                <ContentBlock key={i} block={block} title={project.title} />
              ))}
            </article>

            {/* Specs sidebar */}
            <aside className="lg:sticky lg:top-28 lg:self-start">
              <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                <h2 className="font-serif text-lg font-semibold text-foreground">
                  Specs
                </h2>
                <dl className="mt-5 space-y-5 text-sm">
                  <div>
                    <dt className="text-xs uppercase tracking-wide text-muted-foreground">
                      Category
                    </dt>
                    <dd className="mt-1 font-medium text-foreground">{project.category}</dd>
                  </div>
                  <div>
                    <dt className="text-xs uppercase tracking-wide text-muted-foreground">
                      Year
                    </dt>
                    <dd className="mt-1 font-medium text-foreground">{project.year}</dd>
                  </div>
                  <div>
                    <dt className="text-xs uppercase tracking-wide text-muted-foreground">
                      Tools &amp; Methods
                    </dt>
                    <dd className="mt-2 flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground"
                        >
                          {tag}
                        </span>
                      ))}
                    </dd>
                  </div>
                </dl>
              </div>
            </aside>
          </div>
        </div>

        {/* Prev / next navigation */}
        <nav className="mx-auto max-w-5xl px-6 pb-24">
          <div className="grid gap-4 border-t border-border pt-8 sm:grid-cols-2">
            {prev ? (
              <Link
                href={`/projects/${prev.slug}`}
                className="group flex flex-col rounded-2xl border border-border bg-card p-5 transition-colors hover:border-primary"
              >
                <span className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wide text-muted-foreground">
                  <ArrowLeft className="size-3.5" />
                  Previous
                </span>
                <span className="mt-2 font-serif text-lg font-semibold text-foreground group-hover:text-primary">
                  {prev.title}
                </span>
              </Link>
            ) : (
              <span />
            )}
            {next ? (
              <Link
                href={`/projects/${next.slug}`}
                className="group flex flex-col rounded-2xl border border-border bg-card p-5 text-right transition-colors hover:border-primary sm:items-end"
              >
                <span className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wide text-muted-foreground">
                  Next
                  <ArrowRight className="size-3.5" />
                </span>
                <span className="mt-2 font-serif text-lg font-semibold text-foreground group-hover:text-primary">
                  {next.title}
                </span>
              </Link>
            ) : (
              <span />
            )}
          </div>
        </nav>
      </main>
      <SiteFooter />
    </>
  )
}
