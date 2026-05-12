import type { Metadata, Viewport } from "next"
import Link from "next/link"
import Script from "next/script"
import "./globals.css"
import { crimsonPro, geistMono, inter } from "@/components/assets/fonts"
import { Providers } from "@/components/providers"
import { ThemeToggler } from "@/components/ui/theme-toggler"
import { cn } from "@/lib/utils"

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafaf7" },
    { media: "(prefers-color-scheme: dark)", color: "#1c1c1a" },
  ],
  initialScale: 1.0,
  width: "device-width",
  viewportFit: "cover",
}

export const metadata: Metadata = {
  title: {
    default: "digest",
    template: "%s • digest",
  },
  description: "A daily reading digest of things Cyrus saved.",
  creator: "Cyrus Nouroozi",
  openGraph: {
    siteName: "digest",
    url: "https://digest.cyrusnewday.com",
  },
  metadataBase: new URL("https://digest.cyrusnewday.com"),
}

const NODE_ENV = process.env.NODE_ENV

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {NODE_ENV === "development" && (
          <Script
            crossOrigin="anonymous"
            id="react-scan"
            src="//unpkg.com/react-scan/dist/auto.global.js"
            strategy="afterInteractive"
          />
        )}
      </head>
      <body
        className={cn(
          "min-h-screen w-full antialiased",
          inter.variable,
          geistMono.variable,
          crimsonPro.variable
        )}
      >
        <Providers>
          <div className="mx-auto flex min-h-screen w-full max-w-[80ch] flex-col px-4 md:px-8">
            <header className="flex items-center justify-between py-6 md:py-8">
              <Link
                className="font-semibold font-serif text-xl italic leading-none tracking-tight transition-colors hover:text-muted-foreground"
                href="/"
                prefetch
              >
                digest
              </Link>
              <ThemeToggler />
            </header>
            <main className="flex-1 pb-16">{children}</main>
          </div>
        </Providers>
      </body>
    </html>
  )
}
