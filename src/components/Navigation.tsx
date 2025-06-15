import Link from 'next/link'
import { useRouter } from 'next/router'
import { Search, Bookmark, Settings } from 'lucide-react'

export default function Navigation() {
  const router = useRouter()

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/jobs', label: 'Jobs' },
    { href: '/post-job', label: 'Post a Job' },
    { href: '/companies', label: 'Companies' },
  ]

  return (
    <nav className="bg-white shadow p-3 flex justify-between items-center fixed top-0 left-0 right-0 z-50">
      <div className='flex gap-6 '>
        <Link href="/" className="font-bold text-lg">RemoteCraft</Link>
        <div className="flex space-x-6  ">
        {navLinks.map(link => (
          <Link
            key={link.href}
            href={link.href}
            className={`hover:text-primary ${router.pathname === link.href ? ' font-semibold' : 'text-black'}`}
          >
            {link.label}
          </Link>
        ))}
      </div>

      </div>
      <div className="flex items-center space-x-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search"
            className="bg-gray-100 rounded-full pl-10 pr-4 py-1 outline-none"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        </div>

        <button className="p-2 bg-gray-100 rounded-full">
          <Bookmark className="w-4 h-4 text-gray-600" />
        </button>

        <button className="p-2 bg-gray-100 rounded-full">
          <Settings className="w-4 h-4 text-gray-600" />
        </button>
      </div>
    </nav>
  )
}
