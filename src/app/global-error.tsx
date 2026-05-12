"use client"

type GlobalErrorProps = {
  error: Error & { digest?: string }
  reset: () => void
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  return (
    <html lang="en">
      <body>
        <section className="mx-auto mt-[20vh] flex max-w-[80ch] flex-col items-center gap-4 px-4 text-center">
          <h1 className="font-semibold font-serif text-2xl italic tracking-tight md:text-3xl">
            Something went terribly wrong.
          </h1>
          <button
            className="rounded-full border border-border px-4 py-2 font-mono text-sm uppercase tracking-wide transition-colors hover:bg-muted"
            onClick={reset}
            type="button"
          >
            Reset
          </button>
          {process.env.NODE_ENV === "development" && (
            <details className="mt-4 max-w-lg text-left">
              <summary className="cursor-pointer text-muted-foreground">Error details</summary>
              <pre className="mt-2 overflow-auto rounded bg-muted p-2 text-sm">
                {error.message}
                {error.digest && `\nDigest: ${error.digest}`}
              </pre>
            </details>
          )}
        </section>
      </body>
    </html>
  )
}
