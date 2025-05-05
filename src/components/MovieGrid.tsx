import MovieCard from './MovieCard'

interface Movie {
  id: number
  title: string
  poster: string
  year?: string
}

interface MovieGridProps {
  title: string
  movies: Movie[] | { movies: Movie[], total?: number }
}

export default function MovieGrid({ title, movies }: MovieGridProps) {
  // Handle both array and object formats
  const movieList = Array.isArray(movies) ? movies : movies.movies

  return (
    <section className="py-8">
      <div className="netflix-container">
        <h2 className="text-2xl font-bold mb-6">{title}</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {movieList.map((movie) => (
            <MovieCard
              key={movie.id}
              id={movie.id}
              title={movie.title}
              poster={movie.poster}
              year={movie.year}
            />
          ))}
        </div>
      </div>
    </section>
  )
} 