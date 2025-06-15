import Link from 'next/link'
import { useRouter } from 'next/router'
import { Search, Bookmark, Settings, Menu, X } from 'lucide-react'
import { useState } from 'react'
import { RiHomeOfficeLine } from "react-icons/ri";
export default function Navigation() {
  const router = useRouter()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/jobs', label: 'Jobs' },
    { href: '/post-job', label: 'Post a Job' },
    { href: '/companies', label: 'Companies' },
  ]

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  return (
    <nav className="bg-white shadow-md fixed w-full top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
        
          <div className="flex  items-center">
          {/* <span className='mx-2 my-1'>  < RiHomeOfficeLine /></span> */}
            <Link href="/" className="font-bold md:text-2xl text-black">
              RemoteCraft
            </Link>
            
         
            <div className="hidden md:flex md:ml-8 space-x-6">
              {navLinks.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`hover:text-primary transition-colors ${
                    router.pathname === link.href ? 'text-primary font-semibold' : 'text-gray-700'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search"
                className="bg-gray-100 rounded-full pl-10 pr-4 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            </div>

            <button className="p-2 hover:bg-gray-200 rounded-full transition-colors">
              <Bookmark className="w-5 h-5 text-gray-600" />
            </button>

            <button className="p-2 hover:bg-gray-200 rounded-full transition-colors">
              <Settings className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>


      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  router.pathname === link.href
                    ? 'text-primary bg-primary/10'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}

            <div className="px-3 py-2">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search"
                  className="w-full bg-gray-100 rounded-full pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              </div>
            </div>

            <div className="flex px-3 py-2 space-x-4">
              <button className="p-2 hover:bg-gray-200 rounded-full transition-colors">
                <Bookmark className="w-5 h-5 text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-200 rounded-full transition-colors">
                <Settings className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
