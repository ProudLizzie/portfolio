import type { Metadata } from 'next'
import Link from 'next/link'
import { Download } from 'lucide-react'
import { SiteNav } from '@/components/site-nav'
import { SiteFooter } from '@/components/site-footer'
import { NaturalImage } from '@/components/natural-image'
import { PageHeader } from '@/components/page-header'
import { profile, stats, skills, education, experience, certificates } from '@/lib/portfolio-data'

export const metadata: Metadata = {
  title: 'About — Elizabeth Janicek',
  description: 'Background, education, and technical skills of mechanical engineering student Elizabeth Janicek.',
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
                <NaturalImage
                  src={profile.portrait}
                  alt={`Portrait of ${profile.name}`}
                  sizes="(max-width: 768px) 80vw, 380px"
                />
              </div>
            </div>

            <div className="space-y-5 text-pretty leading-relaxed text-muted-foreground">
              <p>
                I am currently a senior studying Mechanical Engineering at the 
                University of Wisconsin-Madison with an expected graduation of 
                May 2027. I have completed a certificate in Mathematics, with a 
                focus on optimization, and am in the process of earning certificates 
                in Manufacturing and Leadership.

              </p>
              <p>
                When I&apos;m not busy studying for classes or working as a student assistant 
                for ME 201, I&apos;m typically found tinkering with projects that blend 
                creativity and technical skills. Between updating my crochet-based 
                Etsy Shop, or working with Blender to model an animatronic, I am always 
                finding new ways to bring my ideas to life!

              </p>
              <p>
                I try to jump into anything and everything that sparks my curiosity. This 
                was part of my motivation for founding Badgers in Themed Entertainment, a student 
                org dedicated to the themed entertainment and attractions industry. I have loved 
                leading a team of innovative engineers, all working together to make memorable
                experiences for ourselves, and the community.
              </p>
              <p>
                My engineering philosophy is simple: if it doesn't make you smile while it's 
                working, it's not done yet.
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
        </section>

        <section className="mx-auto max-w-6xl px-6 py-20">
          <h2 className="font-serif text-3xl font-semibold text-foreground md:text-4xl">
            Professional Certificates
          </h2>
          <div className="mt-10 space-y-8">
            {certificates.map((item) => (
              <div
                key={item.name}
                className="grid gap-2 border-b border-border pb-8 md:grid-cols-[1fr_2fr] md:gap-8"
              >
                <p className="text-sm text-muted-foreground">{item.date}</p>
                <div>
                  <p className="font-medium text-primary">{item.organization}</p>
                  <h3 className="mt-1 font-serif text-xl font-semibold text-foreground">
                    {item.name}
                  </h3>
                  <p className="mt-2 leading-relaxed text-muted-foreground">
                    {item.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 py-20">
          <h2 className="font-serif text-3xl font-semibold text-foreground md:text-4xl">
            Experience
          </h2>
          <div className="mt-10 space-y-8">
            {experience.map((item) => (
              <div
                key={item.company + item.role}
                className="grid gap-2 border-b border-border pb-8 md:grid-cols-[1fr_2fr] md:gap-8"
              >
                <p className="text-sm text-muted-foreground">{item.period}</p>
                <div>
                  <h3 className="font-serif text-xl font-semibold text-foreground">
                    {item.company}
                  </h3>
                  <p className="mt-1 font-medium text-primary">{item.role}</p>
                  <p className="mt-2 leading-relaxed text-muted-foreground">
                    {item.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 pb-24">
          <div className="flex flex-col items-start gap-4 rounded-3xl bg-primary p-8 text-primary-foreground md:flex-row md:items-center md:justify-between md:p-10">
            <div>
              <h3 className="font-serif text-2xl font-semibold md:text-3xl">
                Want the full resume?
              </h3>
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
