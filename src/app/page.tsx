import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { getMovies, getTrendingMovies, getMoviesByGenre } from '@/lib/db'
import MovieGrid from '@/components/MovieGrid'
import Link from 'next/link'
import Header from '@/components/Header'

export default async function Home() {
  // Get trending movies
  const trendingMovies = await getTrendingMovies(6)
  
  // Get latest movies
  const latestMovies = await getMovies(6, 0)
  
  // Get action movies
  const actionMovies = await getMoviesByGenre('Action', 6, 0)

  return (
    <div className="min-h-screen bg-netflix-black">
      <Header />
      
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center">
        <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent z-10" />
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1925&q=80")',
          }}
        />
        <div className="netflix-container relative z-20">
          <div className="max-w-2xl">
            <h1 className="text-5xl font-bold mb-4">Welcome to StreamFlix</h1>
            <p className="text-xl mb-8">Your ultimate destination for movies and entertainment.</p>
            <div className="flex space-x-4">
              <Link
                href="/movies"
                className="bg-netflix-red text-white px-8 py-3 rounded-md hover:bg-red-700 transition-colors"
              >
                Browse Movies
              </Link>
              <Link
                href="/categories"
                className="bg-white/20 text-white px-8 py-3 rounded-md hover:bg-white/30 transition-colors"
              >
                View Categories
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Content Categories */}
      <div className="pt-20">
        <MovieGrid title="Trending Now" movies={trendingMovies} />
        <MovieGrid title="Latest Movies" movies={latestMovies} />
        <MovieGrid title="Action Movies" movies={actionMovies} />
      </div>
    </div>
  )
} 