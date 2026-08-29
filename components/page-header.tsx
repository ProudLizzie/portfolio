export function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string
  title: string
  description?: string
}) {
  return (
    <div className="mx-auto max-w-6xl px-6 pb-8 pt-16 md:pt-20">
      <p className="font-serif text-sm uppercase tracking-[0.2em] text-primary">
        {eyebrow}
      </p>
      <h1 className="mt-3 text-balance font-serif text-5xl font-semibold tracking-tight text-foreground md:text-6xl">
        {title}
      </h1>
      {description && (
        <p className="mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
          {description}
        </p>
      )}
    </div>
  )
}
