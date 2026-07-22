import type { Metadata } from 'next'
import '../styles/globals.css'

export const metadata: Metadata = {
  title: 'Perri Luo | Finance × AI × Builder',
  description: 'Perri Luo - A finance student exploring the intersection of AI and financial research.',
  keywords: ['finance', 'AI', 'portfolio', 'Perri Luo'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-dark-900 text-white">
        {children}
      </body>
    </html>
  )
}
