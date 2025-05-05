import Image from 'next/image'
import Link from 'next/link'

interface MovieCardProps {
  id: number
  title: string
  poster: string
  year?: string
}

export default function MovieCard({ id, title, poster, year }: MovieCardProps) {
  // Clean up the poster URL by removing any double slashes
  const cleanPosterUrl = poster.replace(/([^:]\/)\/+/g, '$1')

  return (
    <Link href={`/movie/${id}`} className="movie-card group">
      <div className="relative aspect-[2/3] w-full overflow-hidden rounded-md">
        <Image
          src={cleanPosterUrl}
          alt={title}
          fill
          className="movie-card-poster"
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          unoptimized={true}
        />
        <div className="movie-card-overlay">
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h3 className="text-lg font-semibold">{title}</h3>
            {year && <p className="text-sm text-netflix-light-gray">{year}</p>}
          </div>
        </div>
      </div>
    </Link>
  )
} 