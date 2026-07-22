import type { Metadata } from 'next'
import '../styles/globals.css'

export const metadata: Metadata = {
  title: 'Perri Luo - Building Financial Intelligence for the AI Era',
  description: 'Finance × AI × Builder. Perri Luo is a finance student, builder, researcher, and AI explorer.',
  keywords: ['finance', 'AI', 'builder', 'research', 'portfolio', 'Perri Luo'],
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
