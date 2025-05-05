'use client'

import { useState, useRef, useEffect } from 'react'
import { 
  PlayIcon, 
  PauseIcon, 
  SpeakerWaveIcon, 
  SpeakerXMarkIcon,
  ArrowsPointingOutIcon,
  ArrowsPointingInIcon,
  ForwardIcon,
  BackwardIcon
} from '@heroicons/react/24/solid'

interface CustomVideoPlayerProps {
  src: string
  title?: string
  poster?: string
  autoPlay?: boolean
}

export default function CustomVideoPlayer({ src, title, poster, autoPlay = false }: CustomVideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isPlaying, setIsPlaying] = useState(autoPlay)
  const [isMuted, setIsMuted] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [volume, setVolume] = useState(1)
  const [showControls, setShowControls] = useState(true)
  const [isBuffering, setIsBuffering] = useState(false)
  const controlsTimeoutRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleTimeUpdate = () => setCurrentTime(video.currentTime)
    const handleLoadedMetadata = () => setDuration(video.duration)
    const handleWaiting = () => setIsBuffering(true)
    const handlePlaying = () => setIsBuffering(false)
    const handleFullscreenChange = () => setIsFullscreen(document.fullscreenElement !== null)

    video.addEventListener('timeupdate', handleTimeUpdate)
    video.addEventListener('loadedmetadata', handleLoadedMetadata)
    video.addEventListener('waiting', handleWaiting)
    video.addEventListener('playing', handlePlaying)
    document.addEventListener('fullscreenchange', handleFullscreenChange)

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate)
      video.removeEventListener('loadedmetadata', handleLoadedMetadata)
      video.removeEventListener('waiting', handleWaiting)
      video.removeEventListener('playing', handlePlaying)
      document.removeEventListener('fullscreenchange', handleFullscreenChange)
    }
  }, [])

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!videoRef.current) return
      switch (e.key) {
        case ' ': // Spacebar
          e.preventDefault()
          togglePlay()
          break
        case 'ArrowRight':
          skipForward()
          break
        case 'ArrowLeft':
          skipBackward()
          break
        case 'f':
        case 'F':
          toggleFullscreen()
          break
        case 'm':
        case 'M':
          toggleMute()
          break
        default:
          break
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  })

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value)
    if (videoRef.current) {
      videoRef.current.volume = newVolume
      setVolume(newVolume)
      setIsMuted(newVolume === 0)
    }
  }

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value)
    if (videoRef.current) {
      videoRef.current.currentTime = time
      setCurrentTime(time)
    }
  }

  const skipForward = () => {
    if (videoRef.current) {
      videoRef.current.currentTime += 10
    }
  }

  const skipBackward = () => {
    if (videoRef.current) {
      videoRef.current.currentTime -= 10
    }
  }

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen()
      setIsFullscreen(true)
    } else {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }

  const handleMouseMove = () => {
    setShowControls(true)
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current)
    }
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) {
        setShowControls(false)
      }
    }, 3000)
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  return (
    <div 
      ref={containerRef}
      className="relative w-full aspect-video bg-black rounded-lg overflow-hidden group"
      onMouseMove={handleMouseMove}
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        className="w-full h-full"
        autoPlay={autoPlay}
        muted={isMuted}
      />
      
      {/* Buffering Spinner */}
      {isBuffering && (
        <div className="absolute inset-0 flex items-center justify-center z-30">
          <div className="w-12 h-12 border-4 border-t-netflix-red border-white/30 rounded-full animate-spin" />
        </div>
      )}

      {/* Big Center Play Button */}
      {!isPlaying && !isBuffering && (
        <button
          onClick={togglePlay}
          className="absolute inset-0 flex items-center justify-center z-20 bg-black/40 hover:bg-black/60 transition-colors"
        >
          <PlayIcon className="h-20 w-20 text-white drop-shadow-lg" />
        </button>
      )}

      {/* Controls overlay */}
      <div 
        className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 transition-opacity duration-300 z-20 ${
          showControls ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Progress bar */}
        <input
          type="range"
          min={0}
          max={duration}
          value={currentTime}
          onChange={handleSeek}
          className="w-full h-1 bg-gray-600 rounded-full appearance-none cursor-pointer"
        />
        
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center space-x-4">
            <button
              onClick={togglePlay}
              className="text-white hover:text-netflix-red transition-colors"
            >
              {isPlaying ? (
                <PauseIcon className="h-8 w-8" />
              ) : (
                <PlayIcon className="h-8 w-8" />
              )}
            </button>

            <button
              onClick={skipBackward}
              className="text-white hover:text-netflix-red transition-colors"
            >
              <BackwardIcon className="h-6 w-6" />
            </button>

            <button
              onClick={skipForward}
              className="text-white hover:text-netflix-red transition-colors"
            >
              <ForwardIcon className="h-6 w-6" />
            </button>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={toggleMute}
                className="text-white hover:text-netflix-red transition-colors"
              >
                {isMuted || volume === 0 ? (
                  <SpeakerXMarkIcon className="h-6 w-6" />
                ) : (
                  <SpeakerWaveIcon className="h-6 w-6" />
                )}
              </button>
              
              <input
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={volume}
                onChange={handleVolumeChange}
                className="w-24 h-1 bg-gray-600 rounded-full appearance-none cursor-pointer"
              />
            </div>
            
            <span className="text-white text-sm">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>

            {title && (
              <span className="text-white text-sm font-medium ml-4">{title}</span>
            )}
          </div>

          <button
            onClick={toggleFullscreen}
            className="text-white hover:text-netflix-red transition-colors"
          >
            {isFullscreen ? (
              <ArrowsPointingInIcon className="h-6 w-6" />
            ) : (
              <ArrowsPointingOutIcon className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>
    </div>
  )
} 