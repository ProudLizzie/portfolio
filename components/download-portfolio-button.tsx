'use client'

import { useState } from 'react'
import { FileDown, ArrowUpRight, Loader2 } from 'lucide-react'

export function DownloadPortfolioButton() {
  const [status, setStatus] = useState<'idle' | 'loading'>('idle')

  async function handleDownload() {
    if (status === 'loading') return
    setStatus('loading')
    try {
      // Lazy-load the PDF generator so @react-pdf/renderer stays out of the
      // initial bundle and only loads when the visitor asks for the PDF.
      const { generatePortfolioPdf } = await import('@/lib/portfolio-pdf')
      const blob = await generatePortfolioPdf()
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = 'Elizabeth-Janicek-Portfolio.pdf'
      document.body.appendChild(link)
      link.click()
      link.remove()
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error('[v0] Failed to generate portfolio PDF:', error)
    } finally {
      setStatus('idle')
    }
  }

  return (
    <button
      type="button"
      onClick={handleDownload}
      disabled={status === 'loading'}
      aria-label="Download the full portfolio as a PDF"
      className="group inline-flex items-center justify-between gap-8 rounded-lg border border-primary bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-wait disabled:opacity-80"
    >
      <span className="inline-flex items-center gap-2">
        {status === 'loading' ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          <FileDown className="size-4" />
        )}
        {status === 'loading' ? 'Preparing PDF…' : 'Full Portfolio (PDF)'}
      </span>
      <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
    </button>
  )
}
