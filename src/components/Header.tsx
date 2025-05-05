'use client'

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useState, useEffect } from 'react'

export default function Header() {
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()
  const [searchQuery, setSearchQuery] = useState('')

  // Initialize search input with URL query if present
  useEffect(() => {
    const query = searchParams.get('q')
    if (query) {
      setSearchQuery(query)
    }
  }, [searchParams])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-black/80 to-transparent">
      <div className="netflix-container py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Navigation */}
          <div className="flex items-center space-x-8">
            <Link href="/" className="text-2xl font-bold text-netflix-red">StreamFlix</Link>
            <nav className="hidden md:flex space-x-6">
              <Link 
                href="/" 
                className={`text-white hover:text-netflix-red transition-colors ${
                  pathname === '/' ? 'text-netflix-red' : ''
                }`}
              >
                Home
              </Link>
              <Link 
                href="/movies" 
                className={`text-white hover:text-netflix-red transition-colors ${
                  pathname === '/movies' ? 'text-netflix-red' : ''
                }`}
              >
                Movies
              </Link>
              <Link 
                href="/categories" 
                className={`text-white hover:text-netflix-red transition-colors ${
                  pathname === '/categories' ? 'text-netflix-red' : ''
                }`}
              >
                Categories
              </Link>
              <Link 
                href="/new" 
                className={`text-white hover:text-netflix-red transition-colors ${
                  pathname === '/new' ? 'text-netflix-red' : ''
                }`}
              >
                New & Popular
              </Link>
            </nav>
          </div>

          {/* Search and User Menu */}
          <div className="flex items-center space-x-4">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search movies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-netflix-dark text-white px-4 py-2 rounded-md pl-10 focus:outline-none focus:ring-2 focus:ring-netflix-red w-64"
              />
              <button
                type="submit"
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-netflix-gray hover:text-netflix-red transition-colors"
              >
                <MagnifyingGlassIcon className="h-5 w-5" />
              </button>
            </form>
            <button className="text-white hover:text-netflix-red transition-colors">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
} 