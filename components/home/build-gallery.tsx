import Image from 'next/image'
import Link from 'next/link'
import { projects } from '@/lib/portfolio-data'

// Personal / School / Work builds shown as an editorial gallery wall.
const galleryItems = projects.filter((p) => p.category !== 'Key')

// Varied aspect ratios cycled to create a masonry rhythm.
const ratios = [
  'aspect-[3/4]',
  'aspect-square',
  'aspect-[4/5]',
  'aspect-[4/3]',
  'aspect-[5/6]',
  'aspect-square',
]

export function BuildGallery() {
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
            A wall of experiments, coursework, and internship work. Hover to see what it
            is; click to explore more from that corner of my bench.
          </p>
        </div>

        <div className="mt-12 columns-2 gap-4 md:columns-3 [&>*]:mb-4">
          {galleryItems.map((item, i) => (
            <Link
              key={item.slug}
              href={`/projects?category=${item.category}`}
              className="group relative block break-inside-avoid overflow-hidden rounded-2xl border border-border bg-card"
            >
              <div className={`relative ${ratios[i % ratios.length]}`}>
                <Image
                  src={item.image || '/placeholder.svg'}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
                <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-primary/85 via-primary/20 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <span className="inline-flex w-fit rounded-full bg-background/90 px-2.5 py-1 text-[11px] font-medium uppercase tracking-wide text-foreground">
                    {item.category}
                  </span>
                  <h3 className="mt-2 font-serif text-lg font-semibold leading-tight text-primary-foreground">
                    {item.title}
                  </h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
