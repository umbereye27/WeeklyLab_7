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
        <main className="pt-16 sm:pt-18 px-4 sm:px-6 md:px-8 lg:px-16 xl:px-32 mx-auto max-w-7xl">
          {children}
        </main>
      </body>
    </html>
  )
}

