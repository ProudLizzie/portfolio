import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { SiteNav } from '@/components/site-nav'
import { SiteFooter } from '@/components/site-footer'
import { projects, getProject } from '@/lib/portfolio-data'

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }))
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

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const project = getProject(slug)

  if (!project) {
    notFound()
  }

  const gallery = project.gallery ?? []

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

          <div className="mt-6 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
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

        <section className="mx-auto max-w-3xl px-6 py-16">
          <div className="space-y-5 text-lg leading-relaxed text-muted-foreground">
            {(project.longDescription ?? project.description)
              .split('\n')
              .filter(Boolean)
              .map((paragraph, i) => (
                <p key={i} className="text-pretty">
                  {paragraph}
                </p>
              ))}
          </div>
        </section>

        {gallery.length > 0 && (
          <section className="mx-auto max-w-5xl px-6 pb-24">
            <h2 className="font-serif text-2xl font-semibold text-foreground">
              More photos
            </h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {gallery.map((src, i) => (
                <div
                  key={src + i}
                  className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border shadow-sm"
                >
                  <Image
                    src={src || '/placeholder.svg'}
                    alt={`${project.title} — photo ${i + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, 50vw"
                  />
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
      <SiteFooter />
    </>
  )
}
