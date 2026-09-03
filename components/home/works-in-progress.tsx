import { getWorksInProgress } from '@/lib/portfolio-data'

function formatStart(startDate?: string) {
  if (!startDate) return 'In progress'
  // Show the year only — no month marker.
  const [year] = startDate.split('-')
  return `Started ${year}`
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

        <ol className="mt-14 relative border-l border-border pl-8 md:pl-12">
          {items.map((item) => (
            <li key={item.slug} className="relative pb-12 last:pb-0">
              <span
                aria-hidden
                className="absolute -left-[calc(2rem+1px)] top-1.5 flex size-4 -translate-x-1/2 items-center justify-center md:-left-[calc(3rem+1px)]"
              >
                <span className="size-3 rounded-full bg-primary ring-4 ring-background" />
              </span>

              <div className="rounded-2xl border border-border bg-card p-6 shadow-sm transition-colors hover:border-primary/40 md:p-8">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3 className="font-serif text-2xl font-semibold text-foreground">
                    {item.title}
                  </h3>
                  <p className="font-serif text-sm uppercase tracking-[0.15em] text-primary">
                    {formatStart(item.startDate)}
                  </p>
                </div>
                <p className="mt-4 max-w-2xl text-pretty leading-relaxed text-muted-foreground">
                  {item.status ?? item.description}
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
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
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
