import Image from 'next/image'
import { getWorksInProgress } from '@/lib/portfolio-data'

function formatStart(startDate?: string) {
  if (!startDate) return 'In progress'
  const [year, month] = startDate.split('-')
  const date = new Date(Number(year), Number(month) - 1, 1)
  const label = date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
  return `Started ${label}`
}

export function WorksInProgress() {
  const items = getWorksInProgress()

  if (items.length === 0) return null

  return (
    <section className="border-t border-border/60">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <div className="max-w-xl">
          <p className="font-serif text-sm uppercase tracking-[0.2em] text-primary">
            In the Workshop
          </p>
          <h2 className="mt-3 text-balance font-serif text-4xl font-semibold text-foreground md:text-5xl">
            Works in progress
          </h2>
          <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
            Active builds and experiments I&apos;m still figuring out. These are status
            updates, not finished case studies.
          </p>
        </div>

        <div className="mt-12 space-y-8">
          {items.map((item) => (
            <div
              key={item.slug}
              className="grid gap-4 border-b border-border pb-8 md:grid-cols-[1fr_2fr] md:gap-8"
            >
              <div className="flex items-center gap-4">
                <div className="relative size-16 shrink-0 overflow-hidden rounded-xl border border-border">
                  <Image
                    src={item.image || '/placeholder.svg'}
                    alt={item.title}
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                </div>
                <p className="text-sm text-muted-foreground">{formatStart(item.startDate)}</p>
              </div>
              <div>
                <h3 className="font-serif text-xl font-semibold text-foreground">
                  {item.title}
                </h3>
                <p className="mt-2 text-pretty leading-relaxed text-muted-foreground">
                  {item.status ?? item.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
