import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { profile } from '@/lib/portfolio-data'

export function AboutMe() {
  return (
    <section className="border-t border-border/60">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-24">
        <div className="grid items-center gap-10 md:grid-cols-[0.6fr_1fr] md:gap-14">
          <div className="relative mx-auto w-full max-w-[260px]">
            <div className="pointer-events-none absolute -left-4 -top-4 h-full w-full rounded-t-[999px] rounded-b-3xl bg-sage/40" />
            <div className="relative overflow-hidden rounded-t-[999px] rounded-b-3xl border border-border bg-card shadow-md">
              <div className="relative aspect-[3/4]">
                <Image
                  src={profile.portrait || '/placeholder.svg'}
                  alt={`Portrait of ${profile.name}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 60vw, 260px"
                />
              </div>
            </div>
          </div>

          <div>
            <p className="font-serif text-sm uppercase tracking-[0.2em] text-primary">
              About Me
            </p>
            <h2 className="mt-3 text-balance font-serif text-4xl font-semibold text-foreground md:text-5xl">
              Hi, I&apos;m {profile.name}.
            </h2>
            <p className="mt-6 max-w-lg text-pretty text-lg leading-relaxed text-muted-foreground">
              {profile.shortBio}
            </p>
            <Link
              href="/about"
              className="mt-8 inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-6 py-3 text-sm font-medium text-foreground transition-colors hover:border-primary hover:text-primary"
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
