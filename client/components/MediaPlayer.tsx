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
    if (!currentVideo) return

    deleteSongMutation.mutate(currentVideo.id)
    // Let useQuery handle reloading the next song (at index 0)
    setCurrentIndex(0)
  }

  console.log(currentVideo?.url)

  return (
    <>
      {currentVideo && (
        <div className="mb-6 flex flex-col items-center justify-center text-purple-500">
          <h2 className="text-xl font-semibold p-10">
            Now Playing: {currentVideo.name} - {currentVideo.artist}
          </h2>
          <video ref={videoRef} width="45%" controls onEnded={handleEnded}>
            <source src={`/videos/${currentVideo.url}`} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      )}

      {songQueue && <Queue queue={songQueue} currentIndex={currentIndex} />}
    </>
  )
}
