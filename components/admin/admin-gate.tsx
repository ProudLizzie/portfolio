'use client'

import { useState, type FormEvent } from 'react'
import Link from 'next/link'
import { ArrowLeft, Lock, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { AddProjectForm } from '@/components/admin/add-project-form'

// SHA-256 of the admin password. Only the hash lives in the repo; the plaintext
// is never stored. The gate is client-side (this is a static site), so treat it
// as a light lock, not real server-side authentication.
const PASSWORD_HASH = '187a497c86c489563377b5cdf2c2cbfa2c40f6872312e3d6e8ccafb428b375fa'

async function sha256Hex(input: string): Promise<string> {
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(input))
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}

export function AdminGate() {
  const [unlocked, setUnlocked] = useState(false)
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const [checking, setChecking] = useState(false)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setChecking(true)
    setError(false)
    try {
      const hex = await sha256Hex(password)
      if (hex === PASSWORD_HASH) {
        setUnlocked(true)
      } else {
        setError(true)
        setPassword('')
      }
    } finally {
      setChecking(false)
    }
  }

  if (unlocked) {
    return (
      <main className="mx-auto max-w-3xl px-6 py-16 md:py-20">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Admin
            </p>
            <h1 className="mt-2 text-balance font-serif text-3xl font-semibold text-foreground md:text-4xl">
              Add a project
            </h1>
            <p className="mt-2 max-w-prose text-pretty leading-relaxed text-muted-foreground">
              Fill out the fields below and publish. Assets are uploaded and the project data file
              is committed directly to GitHub, so the new project goes live once the site rebuilds.
            </p>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => setUnlocked(false)}
            className="shrink-0"
          >
            <LogOut className="size-3.5" />
            Lock
          </Button>
        </div>
        <div className="mt-10">
          <AddProjectForm />
        </div>
      </main>
    )
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-2xl border border-border bg-card p-8 shadow-sm"
      >
        <div className="flex size-12 items-center justify-center rounded-full bg-secondary">
          <Lock className="size-5 text-secondary-foreground" aria-hidden />
        </div>
        <h1 className="mt-5 font-serif text-2xl font-semibold text-foreground">Protected area</h1>
        <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
          Enter the password to manage projects.
        </p>

        <label htmlFor="admin-password" className="sr-only">
          Password
        </label>
        <input
          id="admin-password"
          type="password"
          autoFocus
          autoComplete="current-password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value)
            setError(false)
          }}
          className="mt-6 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground shadow-sm outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40"
          placeholder="Password"
          aria-invalid={error}
        />
        {error && (
          <p role="alert" className="mt-2 text-sm text-destructive">
            Incorrect password. Try again.
          </p>
        )}

        <Button type="submit" size="lg" disabled={checking || !password} className="mt-5 w-full">
          {checking ? 'Checking…' : 'Unlock'}
        </Button>

        <Link
          href="/"
          className="mt-5 inline-flex items-center gap-1.5 text-sm text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
        >
          <ArrowLeft className="size-3.5" aria-hidden />
          Back to home
        </Link>
      </form>
    </main>
  )
}
