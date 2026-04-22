import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
})

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
})

export const metadata: Metadata = {
  title: 'AI & LLM Specialist | Portfolio',
  description: 'Building intelligent systems that transform how humans interact with technology. Specializing in Large Language Models, Neural Networks, and Production AI Systems.',
  keywords: ['AI', 'LLM', 'Machine Learning', 'Neural Networks', 'Deep Learning', 'Python', 'PyTorch', 'TensorFlow'],
  authors: [{ name: 'AI Specialist' }],
  icons: {
    icon: [
      {
        url: '/JB-lightmode.PNG',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/JB-darkmode.PNG',
        media: '(prefers-color-scheme: dark)',
      },
    ],
    apple: '/JB-darkmode.PNG',
  },
  openGraph: {
    title: 'AI & LLM Specialist | Portfolio',
    description: 'Building intelligent systems that transform how humans interact with technology.',
    type: 'website',
  },
}

export const viewport: Viewport = {
  themeColor: '#000000',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable} bg-background`}>
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
