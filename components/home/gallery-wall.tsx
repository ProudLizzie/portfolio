import Image from 'next/image'
import Link from 'next/link'
import { projects } from '@/lib/portfolio-data'

// Varied tile proportions create an editorial, Pinterest-style rhythm.
// The pattern cycles through tall, square, and wide tiles.
const aspectPattern = [
  'aspect-[3/4]', // tall
  'aspect-square', // square
  'aspect-[4/5]', // slightly tall
  'aspect-[4/3]', // wide
  'aspect-[3/4]', // tall
  'aspect-[5/4]', // wide-ish
  'aspect-square', // square
  'aspect-[3/5]', // extra tall
  'aspect-[4/3]', // wide
]

export function GalleryWall() {
  // WIP projects live in the Works in Progress section, not the gallery wall.
  const items = projects.filter((p) => p.category !== 'Key' && p.category !== 'WIP')

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
          {items.map((item, i) => (
            <Link
              key={item.slug}
              href={`/projects/${item.slug}`}
              className="group relative mb-4 block break-inside-avoid overflow-hidden rounded-2xl sm:mb-5"
            >
              <div className={`relative ${aspectPattern[i % aspectPattern.length]}`}>
                <Image
                  src={item.image || '/placeholder.svg'}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
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
