import Link from "next/link"

export default function NotFoundPage() {
  return (
    <section className="flex min-h-[40vh] flex-col items-center justify-center gap-4 text-center">
      <h1 className="font-semibold font-serif text-3xl italic tracking-tight md:text-4xl">
        Nothing here.
      </h1>
      <p className="text-muted-foreground">That digest doesn’t exist — yet, or any more.</p>
      <Link
        className="font-mono text-sm underline underline-offset-4 transition-[text-underline-offset] hover:underline-offset-[6px]"
        href="/"
      >
        Back to all digests
      </Link>
    </section>
  )
}
