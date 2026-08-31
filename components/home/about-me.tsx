import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { NaturalImage } from '@/components/natural-image'
import { profile } from '@/lib/portfolio-data'

export function AboutMe() {
  return (
    <section className="bg-primary text-primary-foreground">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-24">
        <div className="grid items-center gap-10 md:grid-cols-[0.55fr_1fr] md:gap-14">
          <div className="relative mx-auto w-full max-w-[260px]">
            <div className="pointer-events-none absolute -left-4 -top-4 h-full w-full rounded-3xl bg-sage/40" />
            <div className="relative overflow-hidden rounded-3xl border border-primary-foreground/20 bg-card shadow-md">
              <NaturalImage
                src={profile.portrait}
                alt={`Portrait of ${profile.name}`}
                sizes="(max-width: 768px) 60vw, 260px"
              />
            </div>
          </div>

          <div>
            <p className="font-serif text-sm uppercase tracking-[0.2em] text-primary-foreground/70">
              About Me
            </p>
            <h2 className="mt-3 text-balance font-serif text-3xl font-semibold text-primary-foreground md:text-4xl">
              Hi, I&apos;m {profile.name}.
            </h2>
            <p className="mt-5 max-w-lg text-pretty leading-relaxed text-primary-foreground/80">
              I&apos;m a senior mechanical engineering student at UW-Madison who loves
              blending creativity with technical rigor — from CAD and animatronics to a
              crochet-based Etsy shop with sales in 14+ countries. My philosophy is
              simple: if it doesn&apos;t make you smile while it&apos;s working, it&apos;s
              not done yet.
            </p>
            <Link
              href="/about"
              className="mt-7 inline-flex items-center gap-1.5 rounded-full bg-primary-foreground px-6 py-3 text-sm font-medium text-primary transition-transform hover:-translate-y-0.5"
            >
              Read More
              <ArrowUpRight className="size-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
