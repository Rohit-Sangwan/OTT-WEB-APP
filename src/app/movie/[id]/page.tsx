import { getMovie, getMoviePlayLinks } from '@/lib/db'
import CustomVideoPlayer from '@/components/CustomVideoPlayer'
import PlayOptions from '@/components/PlayOptions'
import { notFound } from 'next/navigation'

export default async function MoviePage({ params }: { params: { id: string } }) {
  const movie = await getMovie(parseInt(params.id))
  const playLinks = await getMoviePlayLinks(parseInt(params.id))

  if (!movie) {
    notFound()
  }

  return (
    <div className="min-h-screen pt-16">
      <div className="netflix-container py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-4">{movie.title}</h1>
          
          {/* Video Player */}
          <div className="mb-8">
            <CustomVideoPlayer
              src={playLinks[0]?.url || ''}
              poster={movie.poster}
              autoPlay={true}
            />
          </div>

          {/* Movie Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <h2 className="text-xl font-semibold mb-4">Description</h2>
              <p className="text-netflix-light-gray mb-6">{movie.description}</p>
              
              <div className="space-y-4">
                <div>
                  <span className="font-semibold">Year: </span>
                  <span className="text-netflix-light-gray">{movie.year}</span>
                </div>
                <div>
                  <span className="font-semibold">Genre: </span>
                  <span className="text-netflix-light-gray">{movie.genres}</span>
                </div>
                <div>
                  <span className="font-semibold">Duration: </span>
                  <span className="text-netflix-light-gray">{movie.duration}</span>
                </div>
              </div>
            </div>

            {/* Play Options */}
            <PlayOptions links={playLinks} />
          </div>
        </div>
      </div>
    </div>
  )
} 