import { getMovie, getMoviePlayLinks } from '@/lib/db'
import CustomVideoPlayer from '@/components/CustomVideoPlayer'
import Header from '@/components/Header'
import Link from 'next/link'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'

export default async function MoviePlayPage({
  params,
}: {
  params: { id: string }
}) {
  const movie = await getMovie(Number(params.id))
  const playLinks = await getMoviePlayLinks(Number(params.id))

  if (!movie) {
    return (
      <div className="min-h-screen bg-netflix-black">
        <Header />
        <div className="netflix-container pt-32 text-center">
          <h1 className="text-2xl text-white">Movie not found</h1>
          <Link href="/movies" className="text-netflix-red hover:underline mt-4 inline-block">
            Back to Movies
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-netflix-black">
      <Header />
      <div className="pt-20">
        {/* Back Button */}
        <div className="netflix-container pt-20">
          <Link
            href="/movies"
            className="inline-flex items-center text-white hover:text-netflix-red transition-colors mb-6"
          >
            <ArrowLeftIcon className="h-5 w-5 mr-2" />
            Back to Movies
          </Link>
        </div>

        {/* Movie Info */}
        <div className="netflix-container mb-8">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Poster */}
            <div className="w-full md:w-1/3 lg:w-1/4">
              <img
                src={movie.poster}
                alt={movie.title}
                className="w-full rounded-lg shadow-lg"
              />
            </div>

            {/* Details */}
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-white mb-4">{movie.title}</h1>
              
              <div className="flex flex-wrap gap-4 mb-6">
                {movie.year && (
                  <span className="text-netflix-light-gray">{movie.year}</span>
                )}
                {movie.duration && (
                  <span className="text-netflix-light-gray">{movie.duration} min</span>
                )}
                {movie.genres && (
                  <div className="flex flex-wrap gap-2">
                    {movie.genres.split(',').map((genre: string) => (
                      <span
                        key={genre}
                        className="px-3 py-1 bg-netflix-dark text-white rounded-full text-sm"
                      >
                        {genre.trim()}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <p className="text-netflix-light-gray mb-8 leading-relaxed">
                {movie.description}
              </p>

              {/* Play Links */}
              {playLinks.length > 0 && (
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold text-white mb-4">Available Sources</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {playLinks.map((link) => (
                      <div
                        key={link.id}
                        className="bg-netflix-dark p-4 rounded-lg hover:bg-netflix-dark/80 transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="text-white font-medium">{link.name}</h3>
                            {link.size && (
                              <p className="text-netflix-light-gray text-sm mt-1">
                                {link.size}
                              </p>
                            )}
                          </div>
                          <Link
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-netflix-red text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
                          >
                            Play
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Video Player */}
        {playLinks.length > 0 && (
          <div className="netflix-container mb-8">
            <div className="aspect-video bg-black rounded-lg overflow-hidden">
              <CustomVideoPlayer
                src={playLinks[0].url}
                title={movie.title}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 