import { searchMovies } from '@/lib/db'
import MovieGrid from '@/components/MovieGrid'
import Header from '@/components/Header'
import Pagination from '@/components/Pagination'

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { q?: string; page?: string }
}) {
  const query = searchParams.q || ''
  const currentPage = Number(searchParams.page) || 1
  const moviesPerPage = 20
  const offset = (currentPage - 1) * moviesPerPage

  const { movies, total } = await searchMovies(query, moviesPerPage, offset)
  const totalPages = Math.ceil(total / moviesPerPage)

  return (
    <div className="min-h-screen bg-netflix-black">
      <Header />
      <div className="pt-20">
        <div className="netflix-container mb-8">
          <h1 className="text-2xl font-bold text-white mb-2">
            {query ? `Search Results for "${query}"` : 'Search Movies'}
          </h1>
          {query && (
            <p className="text-netflix-light-gray">
              Found {total} {total === 1 ? 'result' : 'results'}
            </p>
          )}
        </div>

        {query ? (
          <>
            <MovieGrid title="" movies={{ movies, total }} />
            {totalPages > 1 && (
              <div className="netflix-container pb-8">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  baseUrl={`/search?q=${encodeURIComponent(query)}`}
                />
              </div>
            )}
          </>
        ) : (
          <div className="netflix-container text-center py-16">
            <p className="text-netflix-light-gray text-lg">
              Enter a movie title or description to start searching
            </p>
          </div>
        )}
      </div>
    </div>
  )
} 