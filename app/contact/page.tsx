import type { Metadata } from 'next'
import Link from 'next/link'
import { Mail, Download } from 'lucide-react'
import { LinkedinIcon } from '@/components/brand-icons'
import { SiteNav } from '@/components/site-nav'
import { SiteFooter } from '@/components/site-footer'
import { PageHeader } from '@/components/page-header'
import { profile } from '@/lib/portfolio-data'

export const metadata: Metadata = {
  title: 'Contact — Elizabeth Janicek',
  description: 'Get in touch with Elizabeth about mechanical engineering roles, internships, and projects.',
}

export default function ContactPage() {
  const methods = [
    {
      icon: <Mail className="size-5" />,
      label: 'Email',
      value: profile.email,
      href: `mailto:${profile.email}`,
      external: false,
    },
    {
      icon: <LinkedinIcon className="size-5" />,
      label: 'LinkedIn',
      value: 'in/eajanicek',
      href: profile.linkedin,
      external: true,
    },
    {
      icon: <Download className="size-5" />,
      label: 'Resume',
      value: 'Download PDF',
      href: profile.resumeUrl,
      external: false,
    },
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

        <section className="mx-auto max-w-3xl px-6 pb-24">
          <div className="grid gap-4 sm:grid-cols-3">
            {methods.map((m) => {
              const inner = (
                <>
                  <span className="flex size-12 items-center justify-center rounded-full bg-secondary text-primary">
                    {m.icon}
                  </span>
                  <span className="mt-4 block text-xs uppercase tracking-wide text-muted-foreground">
                    {m.label}
                  </span>
                  <span className="mt-1 block font-medium text-foreground group-hover:text-primary">
                    {m.value}
                  </span>
                </>
              )

              const cardClass =
                'group flex h-full flex-col items-start rounded-2xl border border-border bg-card p-6 shadow-sm transition-colors'

              return m.href ? (
                <Link
                  key={m.label}
                  href={m.href}
                  target={m.external ? '_blank' : undefined}
                  rel={m.external ? 'noopener noreferrer' : undefined}
                  className={`${cardClass} hover:border-primary`}
                >
                  {inner}
                </Link>
              ) : (
                <div key={m.label} className={cardClass}>
                  {inner}
                </div>
              )
            })}
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
