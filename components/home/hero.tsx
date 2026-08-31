import Link from 'next/link'
import { Download, ArrowDown } from 'lucide-react'
import { EditableHeroImage } from '@/components/home/editable-hero-image'
import { profile } from '@/lib/portfolio-data'

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-16 md:grid-cols-[1.1fr_0.9fr] md:py-24">
        <div>
          <p className="font-serif text-sm uppercase tracking-[0.25em] text-primary">
            {profile.role}
          </p>
          <h1 className="mt-5 text-balance font-serif text-5xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-6xl lg:text-7xl">
            Hi, I&apos;m {profile.name.split(' ')[0]}.
          </h1>
          <p className="mt-6 max-w-md text-pretty text-lg leading-relaxed text-muted-foreground">
            {profile.intro}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href={profile.resumeUrl}
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-transform hover:-translate-y-0.5"
            >
              <Download className="size-4" />
              Download Resume
            </Link>
            <Link
              href="#featured"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-medium text-foreground transition-colors hover:border-primary hover:text-primary"
            >
              View Projects
              <ArrowDown className="size-4" />
            </Link>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-sm">
          <div className="pointer-events-none absolute -right-6 -top-6 h-full w-full rounded-t-[999px] rounded-b-3xl bg-rose/40" />
          <div className="pointer-events-none absolute -bottom-6 -left-6 size-28 rounded-full bg-sage/50" />
          <EditableHeroImage
            defaultSrc="/images/hero-blueprint.png"
            alt="Technical blueprint illustration of an exploded mechanical gear assembly"
          />
        </div>
      </div>
    </section>
  )
}
