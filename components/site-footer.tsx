import Link from 'next/link'
import { Mail, ArrowUpRight } from 'lucide-react'
import { LinkedinIcon, GithubIcon } from '@/components/brand-icons'
import { profile } from '@/lib/portfolio-data'

export function SiteFooter() {
  return (
    <footer id="contact" className="border-t border-border/60 bg-secondary/50">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <div className="max-w-md">
            <p className="font-serif text-sm uppercase tracking-[0.2em] text-primary">
              Get in touch
            </p>
            <h2 className="mt-3 text-balance font-serif text-3xl font-semibold text-foreground md:text-4xl">
              Let&apos;s build something that works.
            </h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Open to full-time roles and internships in mechanical design, robotics,
              and product development starting Summer 2027.
            </p>
            <Link
              href={`mailto:${profile.email}`}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-transform hover:-translate-y-0.5"
            >
              <Mail className="size-4" />
              {profile.email}
            </Link>
          </div>

          <div className="flex flex-col gap-3">
            <SocialLink href={profile.linkedin} icon={<LinkedinIcon className="size-4" />} label="LinkedIn" />
            <SocialLink href={profile.github} icon={<GithubIcon className="size-4" />} label="GitHub" />
            <SocialLink href={`mailto:${profile.email}`} icon={<Mail className="size-4" />} label="Email" />
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-2 border-t border-border/60 pt-6 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p>
            &copy; {new Date().getFullYear()} {profile.name}. All rights reserved.
          </p>
          <p>{profile.location}</p>
        </div>
      </div>
    </footer>
  )
}

function SocialLink({
  href,
  icon,
  label,
}: {
  href: string
  icon: React.ReactNode
  label: string
}) {
  return (
    <Link
      href={href}
      className="group inline-flex items-center justify-between gap-8 rounded-lg border border-border bg-card px-5 py-3 text-sm font-medium text-foreground transition-colors hover:border-primary hover:text-primary"
    >
      <span className="inline-flex items-center gap-2">
        {icon}
        {label}
      </span>
      <ArrowUpRight className="size-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
    </Link>
  )
}
