'use client'

import { useEffect, useRef, useState } from 'react'
import videojs from 'video.js'
import 'video.js/dist/video-js.css'

interface VideoPlayerProps {
  src: string
  poster?: string
  title?: string
}

export default function VideoPlayer({ src, poster, title }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const playerRef = useRef<any>(null)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    console.log('VideoPlayer mounted with src:', src)
    
    if (!playerRef.current && videoRef.current) {
      const videoElement = videoRef.current
      
      // Initialize video.js player
      try {
        playerRef.current = videojs(videoElement, {
          controls: true,
          fluid: true,
          responsive: true,
          playbackRates: [0.5, 1, 1.5, 2],
          poster,
          sources: [{
            src,
            type: 'video/mp4'
          }],
          html5: {
            hls: {
              enableLowInitialPlaylist: true,
              smoothQualityChange: true,
              overrideNative: true
            }
          }
        })

        // Add event listeners
        playerRef.current.on('error', () => {
          const error = playerRef.current.error()
          console.error('Video.js error:', error)
          setError(`Failed to load video: ${error?.message || 'Unknown error'}`)
        })

        playerRef.current.on('loadeddata', () => {
          console.log('Video loaded successfully')
          setIsLoading(false)
        })

        playerRef.current.on('waiting', () => {
          console.log('Video is buffering')
          setIsLoading(true)
        })

        playerRef.current.on('playing', () => {
          console.log('Video is playing')
          setIsLoading(false)
        })

      } catch (err) {
        console.error('Error initializing video player:', err)
        setError('Failed to initialize video player')
      }
    }

    return () => {
      if (playerRef.current) {
        console.log('Disposing video player')
        playerRef.current.dispose()
        playerRef.current = null
      }
    }
  }, [src, poster])

  if (error) {
    return (
      <div className="video-player-container bg-netflix-dark p-4 rounded-md">
        <div className="text-red-500">{error}</div>
        <button 
          onClick={() => {
            setError(null)
            setIsLoading(true)
            if (playerRef.current) {
              playerRef.current.load()
            }
          }}
          className="mt-2 px-4 py-2 bg-netflix-red text-white rounded-md hover:bg-red-700"
        >
          Try Again
        </button>
      </div>
    )
  }

  return (
    <div className="video-player-container">
      <div data-vjs-player>
        <video
          ref={videoRef}
          className="video-js vjs-big-play-centered vjs-theme-city"
          playsInline
          crossOrigin="anonymous"
        >
          <p className="vjs-no-js">
            To view this video please enable JavaScript, and consider upgrading to a
            web browser that supports HTML5 video
          </p>
        </video>
      </div>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
          <div className="text-white">Loading...</div>
        </div>
      )}
      {title && (
        <h2 className="text-xl font-semibold mt-4">{title}</h2>
      )}
    </div>
  )
} 