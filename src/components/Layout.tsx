import Navigation from './Navigation'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-grayBg text-black">
      <Navigation />
      <main className="p-4">{children}</main>
    </div>
  )
}
