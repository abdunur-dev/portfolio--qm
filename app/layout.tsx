import type { Metadata } from 'next'
import { Geist, Geist_Mono, Mrs_Saint_Delafield } from 'next/font/google'
import localFont from 'next/font/local'
import { Analytics } from '@vercel/analytics/next'
import { ThemeProvider } from '@/components/theme-provider'
import { ThemeSwitch } from '@/components/minimal/theme-switch'
import './globals.css'

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
});
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });
// Display face for the hero name.
// Redaction (OFL, via @fontsource/redaction): display serif for names and titles.
const display = localFont({
  src: [
    { path: '../node_modules/@fontsource/redaction/files/redaction-latin-400-normal.woff2', weight: '400', style: 'normal' },
    { path: '../node_modules/@fontsource/redaction/files/redaction-latin-400-italic.woff2', weight: '400', style: 'italic' },
    { path: '../node_modules/@fontsource/redaction/files/redaction-latin-700-normal.woff2', weight: '700', style: 'normal' },
  ],
  variable: '--font-display',
  fallback: ['Times New Roman', 'serif'],
});
// Handwritten signature in the letterhead.
const signature = Mrs_Saint_Delafield({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-signature",
});

export const metadata: Metadata = {
  title: 'Abdurhaman Nur — Systems & Web3 Engineer',
  description: "A blog by Abdurhaman — software, community, and quiet thinking from Addis Ababa.",
  icons: {
    icon: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_2026-08-20_05-28-58-EnRVYSJinKSizsaqJ58b77WHWjUHDY.jpg',
    shortcut: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_2026-08-20_05-28-58-EnRVYSJinKSizsaqJ58b77WHWjUHDY.jpg',
    apple: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_2026-08-20_05-28-58-EnRVYSJinKSizsaqJ58b77WHWjUHDY.jpg',
  },

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
      className={`bg-background ${geist.variable} ${geistMono.variable} ${display.variable} ${signature.variable}`}
    >
      <body className="font-sans antialiased text-foreground selection:bg-foreground/10">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          {children}
          <ThemeSwitch />
        </ThemeProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
