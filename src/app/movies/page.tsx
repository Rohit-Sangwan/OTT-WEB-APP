import { getMovies } from '@/lib/db'
import MovieGrid from '@/components/MovieGrid'
import Header from '@/components/Header'
import Pagination from '@/components/Pagination'

export default async function MoviesPage({
  searchParams,
}: {
  searchParams: { page?: string }
}) {
  const currentPage = Number(searchParams.page) || 1
  const moviesPerPage = 20
  const offset = (currentPage - 1) * moviesPerPage

  const { movies, total } = await getMovies(moviesPerPage, offset)
  const totalPages = Math.ceil(total / moviesPerPage)

  return (
    <div className="min-h-screen bg-netflix-black">
      <Header />
      <div className="pt-20">
        <MovieGrid title="All Movies" movies={{ movies, total }} />
        <div className="netflix-container pb-8">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            baseUrl="/movies"
          />
        </div>
      </div>
    </div>
  )
} 