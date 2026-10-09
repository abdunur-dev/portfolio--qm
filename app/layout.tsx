import type { Metadata } from 'next'
import { Geist, Geist_Mono, Instrument_Serif } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { ThemeProvider } from '@/components/theme-provider'
import './globals.css'

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
});
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });
const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
});

export const metadata: Metadata = {
  title: 'Abdurhaman Nur · burhan_',
  description: "A blog by Abdurhaman — software, community, and quiet thinking from Addis Ababa.",
  icons: {
    icon: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_2026-08-20_05-28-58-EnRVYSJinKSizsaqJ58b77WHWjUHDY.jpg',
    shortcut: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_2026-08-20_05-28-58-EnRVYSJinKSizsaqJ58b77WHWjUHDY.jpg',
    apple: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_2026-08-20_05-28-58-EnRVYSJinKSizsaqJ58b77WHWjUHDY.jpg',
  },
  generator: 'v0.app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`bg-background ${geist.variable} ${geistMono.variable} ${instrumentSerif.variable}`}
    >
      <body className="font-mono antialiased selection:bg-primary/20 selection:text-foreground">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          {children}
        </ThemeProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
