import { useState, useRef, useEffect } from 'react'
import Queue from './Queue'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { deleteSongFromQueue, getQueue } from '../apis/queue'

export default function MediaPlayer() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const videoRef = useRef<HTMLVideoElement>(null)

  const queryClient = useQueryClient()

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

  return (
    <>
      {currentVideo && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Now Playing</h2>
          <p className="mb-2">{currentVideo.name}</p>
          <video ref={videoRef} width="100%" controls onEnded={handleEnded}>
            <source
              src={`public/videos/${currentVideo.url}`}
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </div>
      )}

      {songQueue && <Queue queue={songQueue} currentIndex={currentIndex} />}
    </>
  )
}
