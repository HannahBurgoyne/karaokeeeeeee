import { useState, useRef, useEffect } from 'react'
import Queue from './Queue'

const videos = [
  {
    id: 1,
    name: 'Bohemian Rhapsody - Queen',
    artist: '',
    url: 'https://www.w3schools.com/html/mov_bbb.mp4',
  },
  {
    id: 2,
    name: 'Let It Go - Frozen',
    artist: '',
    url: 'https://www.w3schools.com/html/movie.mp4',
  },
  {
    id: 3,
    name: 'Never Gonna Give You Up - Rick Astley',
    artist: '',
    url: 'https://www.w3schools.com/html/mov_bbb.mp4', // duplicate for demo
  },
]

export default function MediaPlayer() {
  const [queue, setQueue] = useState<typeof videos>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const videoRef = useRef<HTMLVideoElement>(null)

  const currentVideo = queue[currentIndex]

  useEffect(() => {
    if (videoRef.current && currentVideo) {
      videoRef.current.load()
      videoRef.current.play().catch(() => {}) // Avoid autoplay error
    }
  }, [currentVideo])

  const handleEnded = () => {
    if (currentIndex + 1 < queue.length) {
      setCurrentIndex((i) => i + 1)
    } else {
      setCurrentIndex(0)
      setQueue([]) // Clear queue at end
    }
  }

  const addToQueue = (video: (typeof videos)[0]) => {
    setQueue((prev) => [...prev, video])
  }

  return (
    <>
      <div className="p-6 max-w-xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Karaoke Queue 🎤</h1>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Available Songs</h2>
          <ul className="space-y-2">
            {videos.map((video) => (
              <li key={video.id} className="flex justify-between items-center">
                <span>{video.name}</span>
                <button
                  className="bg-blue-500 text-white px-3 py-1 rounded"
                  onClick={() => addToQueue(video)}
                >
                  Add to Queue
                </button>
              </li>
            ))}
          </ul>
        </div>

        {currentVideo && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Now Playing</h2>
            <p className="mb-2">{currentVideo.name}</p>
            <video ref={videoRef} width="100%" controls onEnded={handleEnded}>
              <source src={currentVideo.url} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        )}

        {queue.length > 0 && (
          <Queue queue={queue} currentIndex={currentIndex} />
        )}
      </div>
    </>
  )
}
