import { useState, useRef, useEffect } from 'react'
import Queue from './Queue'
import { getSongs } from '../apis/songs'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Video } from '../../models/Video'
import { addSongToQueue, deleteSongFromQueue, getQueue } from '../apis/queue'

export default function MediaPlayer() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const videoRef = useRef<HTMLVideoElement>(null)

  const queryClient = useQueryClient()

  const { data } = useQuery({ queryKey: ['songs'], queryFn: getSongs })

  const { data: songQueue } = useQuery({
    queryKey: ['queue'],
    queryFn: getQueue,
    refetchInterval: 3000, // Poll every 3s
  })

  const currentVideo = songQueue && songQueue[currentIndex]

  // Mutation to delete a song from the queue after it has played
  const deleteSongMutation = useMutation({
    mutationFn: (videoId: number) => deleteSongFromQueue(videoId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['queue'] }) // Refresh the queue after deletion
    },
  })

  // add a new song to the queue
  const addMutation = useMutation({
    mutationFn: (video: Video) => addSongToQueue(video),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['queue'] })
    },
  })

  useEffect(() => {
    if (videoRef.current && currentVideo) {
      videoRef.current.load()
      videoRef.current.play().catch(() => {}) // Avoid autoplay error
    }
  }, [currentVideo])

  function handleEnded() {
    if (currentVideo) {
      deleteSongMutation.mutate(currentVideo.id)
    }

    if (songQueue && songQueue.length > 0) {
      if (currentIndex + 1 < songQueue.length) {
        setCurrentIndex((i) => i + 1)
      } else {
        setCurrentIndex(0)
      }
    } else {
      setCurrentIndex(0)
    }
  }

  function addToQueue(video: Video) {
    addMutation.mutate(video)
  }

  return (
    <>
      <div className="p-6 max-w-xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Karaoke Queue 🎤</h1>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Available Songs</h2>
          <ul className="space-y-2">
            {data?.map((video) => (
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

        {songQueue && <Queue queue={songQueue} currentIndex={currentIndex} />}
      </div>
    </>
  )
}
