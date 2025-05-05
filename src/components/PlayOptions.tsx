'use client'

interface PlayLink {
  id: number
  url: string
  name: string
  size?: string
}

interface PlayOptionsProps {
  links: PlayLink[]
}

export default function PlayOptions({ links }: PlayOptionsProps) {
  const handlePlaySource = (url: string) => {
    const video = document.querySelector('video')
    if (video) {
      video.src = url
      video.play()
    }
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Play Options</h2>
      <div className="space-y-2">
        {links.map((link, index) => (
          <button
            key={link.id}
            className="w-full bg-netflix-dark hover:bg-netflix-red text-white py-2 px-4 rounded transition-colors"
            onClick={() => handlePlaySource(link.url)}
          >
            Play Source {index + 1}
          </button>
        ))}
      </div>
    </div>
  )
} 