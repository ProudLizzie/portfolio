import Image from 'next/image'
import Link from 'next/link'
import { projects, type ProjectCategory } from '@/lib/portfolio-data'

const archiveFilters: ProjectCategory[] = ['Personal', 'School', 'Work']

function hrefFor(project: (typeof projects)[number]) {
  // If a project ever gets its own detail page, link straight to it here.
  // Otherwise, deep-link into the archive filtered to its category.
  const category = archiveFilters.includes(project.category as ProjectCategory)
    ? project.category
    : 'All'
  return `/projects?category=${encodeURIComponent(category)}`
}

export function GalleryWall() {
  const items = projects.filter((p) => p.category !== 'Key')

  return (
    <section className="border-t border-border/60">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <div className="max-w-xl">
          <p className="font-serif text-sm uppercase tracking-[0.2em] text-primary">
            More Builds
          </p>
          <h2 className="mt-3 text-balance font-serif text-4xl font-semibold text-foreground md:text-5xl">
            Smaller things I&apos;ve made
          </h2>
          <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
            A wall of personal, school, and work projects. Tap any piece to explore
            more.
          </p>
        </div>

        <div className="mt-10 columns-2 gap-4 sm:gap-5 lg:columns-3">
          {items.map((item) => (
            <Link
              key={item.slug}
              href={hrefFor(item)}
              className="group relative mb-4 block break-inside-avoid overflow-hidden rounded-2xl sm:mb-5"
            >
              <Image
                src={item.image || '/placeholder.svg'}
                alt={item.title}
                width={600}
                height={800}
                className="h-auto w-full transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 33vw"
              />
              <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-primary/85 via-primary/25 to-transparent p-5 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <span className="w-fit rounded-full bg-background/90 px-3 py-1 text-xs font-medium text-primary backdrop-blur">
                  {item.category}
                </span>
                <h3 className="mt-2 font-serif text-lg font-semibold text-primary-foreground">
                  {item.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
