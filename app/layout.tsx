import type { Metadata } from 'next'
import { Anton, Geist, JetBrains_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { ThemeProvider } from '@/components/theme-provider'
import './globals.css'

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
});
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains-mono" });
// Condensed brutalist display face for headlines
const anton = Anton({ subsets: ["latin"], weight: "400", variable: "--font-anton" });

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
      className={`bg-background ${geist.variable} ${jetbrainsMono.variable} ${anton.variable}`}
    >
      <body className="font-sans antialiased text-foreground selection:bg-primary/20 selection:text-highlighted">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          {children}
        </ThemeProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
