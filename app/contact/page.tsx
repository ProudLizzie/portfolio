import type { Metadata } from 'next'
import Link from 'next/link'
import { Mail, MapPin } from 'lucide-react'
import { LinkedinIcon, GithubIcon } from '@/components/brand-icons'
import { SiteNav } from '@/components/site-nav'
import { SiteFooter } from '@/components/site-footer'
import { PageHeader } from '@/components/page-header'
import { ContactForm } from '@/components/contact/contact-form'
import { profile } from '@/lib/portfolio-data'

export const metadata: Metadata = {
  title: 'Contact — Elizabeth Janicek',
  description: 'Get in touch with Elizabeth about mechanical engineering roles, internships, and projects.',
}

export default function ContactPage() {
  const details = [
    { icon: <Mail className="size-4" />, label: 'Email', value: profile.email, href: `mailto:${profile.email}` },
    { icon: <LinkedinIcon className="size-4" />, label: 'LinkedIn', value: 'in/example', href: profile.linkedin },
    { icon: <GithubIcon className="size-4" />, label: 'GitHub', value: '@example', href: profile.github },
    { icon: <MapPin className="size-4" />, label: 'Location', value: profile.location, href: undefined },
  ]

  return (
    <>
      <SiteNav />
      <main>
        <PageHeader
          eyebrow="Contact"
          title="Let's talk"
          description="Whether it's a full-time opening, an internship, or a project you want a second pair of hands on — I'd love to hear from you."
        />

        <section className="mx-auto max-w-6xl px-6 pb-24">
          <div className="grid gap-10 md:grid-cols-[1fr_0.7fr] md:items-start">
            <ContactForm />

            <div className="space-y-3">
              {details.map((d) =>
                d.href ? (
                  <Link
                    key={d.label}
                    href={d.href}
                    className="group flex items-center gap-4 rounded-2xl border border-border bg-card p-5 transition-colors hover:border-primary"
                  >
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-secondary text-primary">
                      {d.icon}
                    </span>
                    <span>
                      <span className="block text-xs uppercase tracking-wide text-muted-foreground">
                        {d.label}
                      </span>
                      <span className="block font-medium text-foreground group-hover:text-primary">
                        {d.value}
                      </span>
                    </span>
                  </Link>
                ) : (
                  <div
                    key={d.label}
                    className="flex items-center gap-4 rounded-2xl border border-border bg-card p-5"
                  >
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-secondary text-primary">
                      {d.icon}
                    </span>
                    <span>
                      <span className="block text-xs uppercase tracking-wide text-muted-foreground">
                        {d.label}
                      </span>
                      <span className="block font-medium text-foreground">{d.value}</span>
                    </span>
                  </div>
                ),
              )}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
