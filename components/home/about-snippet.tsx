import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { stats } from '@/lib/portfolio-data'

export function AboutSnippet() {
  return (
    <section className="border-t border-border/60 bg-primary text-primary-foreground">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <div className="grid gap-12 md:grid-cols-[1fr_0.8fr] md:items-center">
          <div>
            <p className="font-serif text-sm uppercase tracking-[0.2em] text-primary-foreground/70">
              About
            </p>
            <h2 className="mt-3 text-balance font-serif text-4xl font-semibold md:text-5xl">
              Designing hardware that earns its keep.
            </h2>
            <p className="mt-6 max-w-lg text-pretty leading-relaxed text-primary-foreground/80">
              I care about the whole loop — from a first sketch and CAD model, through
              simulation and tolerance analysis, to machining, assembly, and the test
              bench. I believe good mechanical design is quiet: it works, it lasts, and
              it makes the next engineer&apos;s job easier.
            </p>
            <Link
              href="/about"
              className="mt-8 inline-flex items-center gap-1.5 rounded-full bg-background px-6 py-3 text-sm font-medium text-foreground transition-transform hover:-translate-y-0.5"
            >
              Read the full story
              <ArrowUpRight className="size-4" />
            </Link>
          </div>

          <dl className="grid grid-cols-3 gap-6 md:grid-cols-1">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="border-t border-primary-foreground/20 pt-4 md:flex md:items-baseline md:justify-between md:gap-4"
              >
                <dt className="order-2 text-sm text-primary-foreground/70 md:order-2">
                  {stat.label}
                </dt>
                <dd className="order-1 font-serif text-4xl font-semibold md:order-1 md:text-5xl">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
