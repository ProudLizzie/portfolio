import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Download } from 'lucide-react'
import { SiteNav } from '@/components/site-nav'
import { SiteFooter } from '@/components/site-footer'
import { PageHeader } from '@/components/page-header'
import { profile, stats, skills, education, experience, certificates } from '@/lib/portfolio-data'

export const metadata: Metadata = {
  title: 'About — Elena Vaughn',
  description: 'Background, education, and technical skills of mechanical engineering student Elena Vaughn.',
}

export default function AboutPage() {
  return (
    <>
      <SiteNav />
      <main>
        <PageHeader
          eyebrow="About"
          title="A bit about me"
          description="Senior mechanical engineering student with a bias toward building, testing, and iterating on real hardware."
        />

        <section className="mx-auto max-w-6xl px-6 pb-16">
          <div className="grid gap-12 md:grid-cols-[0.8fr_1fr] md:items-start">
            <div className="relative mx-auto w-full max-w-sm">
              <div className="pointer-events-none absolute -left-5 -top-5 h-full w-full rounded-3xl bg-sage/40" />
              <div className="relative overflow-hidden rounded-3xl border border-border shadow-md">
                <div className="relative aspect-[3/4]">
                  <Image
                    src={profile.portrait || '/placeholder.svg'}
                    alt={`Portrait of ${profile.name}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 80vw, 380px"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-5 text-pretty leading-relaxed text-muted-foreground">
              <p>
                I&apos;m {profile.name}, a mechanical engineering student at the
                University of Michigan finishing my senior year. My interest in
                engineering started with taking things apart — printers, bikes,
                a very unlucky lawnmower — and never quite putting them back the
                same way.
              </p>
              <p>
                Today that curiosity shows up as robotics, precision mechanical
                design, and sustainable energy systems. I&apos;m most at home moving
                between CAD, the simulation environment, and the machine shop,
                closing the gap between what a model predicts and how a part
                actually behaves.
              </p>
              <p>
                Outside of coursework I lead subsystem design on the Formula SAE
                team, mentor first-year students in the makerspace, and take on
                freelance CAD work. I&apos;m looking for a full-time role where I can
                own hardware from concept through validation.
              </p>

              <div className="grid grid-cols-3 gap-6 border-t border-border pt-8">
                {stats.map((stat) => (
                  <div key={stat.label}>
                    <p className="font-serif text-3xl font-semibold text-foreground md:text-4xl">
                      {stat.value}
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-border/60 bg-card/40">
          <div className="mx-auto max-w-6xl px-6 py-20">
            <h2 className="font-serif text-3xl font-semibold text-foreground md:text-4xl">
              Skills &amp; tools
            </h2>
            <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {skills.map((group) => (
                <div key={group.group}>
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-primary">
                    {group.group}
                  </h3>
                  <ul className="mt-4 space-y-2">
                    {group.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-center gap-2 text-muted-foreground"
                      >
                        <span className="size-1.5 rounded-full bg-rose" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 py-20">
          <h2 className="font-serif text-3xl font-semibold text-foreground md:text-4xl">
            Education
          </h2>
          <div className="mt-10 space-y-8">
            {education.map((item) => (
              <div
                key={item.school}
                className="grid gap-2 border-b border-border pb-8 md:grid-cols-[1fr_2fr] md:gap-8"
              >
                <p className="text-sm text-muted-foreground">{item.period}</p>
                <div>
                  <h3 className="font-serif text-xl font-semibold text-foreground">
                    {item.school}
                  </h3>
                  <p className="mt-1 font-medium text-primary">{item.degree}</p>
                  <p className="mt-2 leading-relaxed text-muted-foreground">
                    {item.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 flex flex-col items-start gap-4 rounded-3xl bg-primary p-8 text-primary-foreground md:flex-row md:items-center md:justify-between">
            <div>
              <h3 className="font-serif text-2xl font-semibold">Want the full resume?</h3>
              <p className="mt-1 text-primary-foreground/80">
                Download a one-page PDF with experience, coursework, and references.
              </p>
            </div>
            <Link
              href={profile.resumeUrl}
              className="inline-flex shrink-0 items-center gap-2 rounded-full bg-background px-6 py-3 text-sm font-medium text-foreground transition-transform hover:-translate-y-0.5"
            >
              <Download className="size-4" />
              Download Resume
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
