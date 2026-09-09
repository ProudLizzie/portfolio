import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { getMediaMentions } from '@/lib/portfolio-data'

function formatDate(date?: string) {
  if (!date) return null
  // Accept YYYY-MM or YYYY-MM-DD; render a friendly month + year.
  const [year, month] = date.split('-')
  if (!year) return null
  if (!month) return year
  const d = new Date(Number(year), Number(month) - 1)
  return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
}

/**
 * Shared "As Seen In" / Media Mentions list.
 *
 * - `compact` (home page): small thumbnail cards. A grid for a few items,
 *   a horizontal scroll once there are more than three.
 * - `detailed` (about page): larger photo, title, date, and excerpt.
 *
 * `tone="onPrimary"` recolors the heading/eyebrow for placement on the primary
 * (dark) background used in the home About Me section; the cards themselves are
 * light `bg-card` in both tones.
 */
export function MediaMentions({
  variant = 'compact',
  tone = 'default',
  className,
}: {
  variant?: 'compact' | 'detailed'
  tone?: 'default' | 'onPrimary'
  className?: string
}) {
  const mentions = getMediaMentions()
  if (mentions.length === 0) return null

  const onPrimary = tone === 'onPrimary'
  const eyebrowClass = onPrimary ? 'text-primary-foreground/70' : 'text-muted-foreground'
  const headingClass = onPrimary ? 'text-primary-foreground' : 'text-foreground'

  if (variant === 'detailed') {
    return (
      <section className={cn('space-y-8', className)}>
        <div>
          <p className={cn('font-mono text-xs uppercase tracking-[0.2em]', eyebrowClass)}>
            As Seen In
          </p>
          <h2 className={cn('mt-2 font-serif text-3xl font-semibold md:text-4xl', headingClass)}>
            Media Mentions
          </h2>
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          {mentions.map((m) => (
            <a
              key={m.id}
              href={m.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all hover:-translate-y-1 hover:shadow-md sm:flex-row"
            >
              <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden sm:aspect-auto sm:h-auto sm:w-40">
                <Image
                  src={m.photo || '/placeholder.svg'}
                  alt=""
                  fill
                  sizes="(max-width: 640px) 100vw, 160px"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col p-5">
                {formatDate(m.date) && (
                  <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    {formatDate(m.date)}
                  </span>
                )}
                <h3 className="mt-1 font-serif text-lg font-semibold leading-snug text-foreground">
                  {m.title}
                </h3>
                {m.excerpt && (
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{m.excerpt}</p>
                )}
                <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-medium text-primary transition-colors group-hover:text-primary/80">
                  Read article
                  <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>
              </div>
            </a>
          ))}
        </div>
      </section>
    )
  }

  // Compact: grid for up to three items, horizontal scroll beyond that.
  const scroll = mentions.length > 3

  return (
    <section className={cn('space-y-6', className)}>
      <div>
        <p className={cn('font-serif text-sm uppercase tracking-[0.2em]', eyebrowClass)}>
          As Seen In
        </p>
        <h3 className={cn('mt-2 font-serif text-2xl font-semibold', headingClass)}>
          Media Mentions
        </h3>
      </div>
      <ul
        className={cn(
          scroll
            ? 'flex snap-x gap-4 overflow-x-auto pb-2 [scrollbar-width:thin]'
            : 'grid gap-4 sm:grid-cols-2 lg:grid-cols-3',
        )}
      >
        {mentions.map((m) => (
          <li key={m.id} className={cn(scroll && 'w-56 shrink-0 snap-start')}>
            <a
              href={m.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden">
                <Image
                  src={m.photo || '/placeholder.svg'}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 50vw, 224px"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 items-start justify-between gap-2 p-4">
                <span className="font-medium leading-snug text-foreground">{m.title}</span>
                <ArrowUpRight className="mt-0.5 size-4 shrink-0 text-primary transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </div>
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}
