import { Work_Sans } from 'next/font/google'
import Navigation from './Navigation'

const workSans = Work_Sans({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700'],
  variable: '--font-work-sans',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${workSans.variable}`}>
      <body className={`${workSans.className} min-h-screen bg-grayBg text-black`}>
        <Navigation />
        <main className="pt-18 mx-32">{children}</main>
      </body>
    </html>
  )
}

