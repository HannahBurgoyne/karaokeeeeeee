import { useQueryClient, useQuery, useMutation } from '@tanstack/react-query'
import { getSongs } from '../apis/songs'
import { Video } from '../../models/Video'
import { addSongToQueue, getQueue } from '../apis/queue'
import { useState } from 'react'

export default function SongList() {
  const [warning, setWarning] = useState<string | null>(null)

  const { data } = useQuery({ queryKey: ['songs'], queryFn: getSongs })
  const { data: songQueue } = useQuery({
    queryKey: ['queue'],
    queryFn: getQueue,
    refetchInterval: 3000, // Poll every 3s
  })

  const queryClient = useQueryClient()

  // add a new song to the queue
  const addMutation = useMutation({
    mutationFn: (video: Video) => addSongToQueue(video),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['queue'] })
    },
  })

  function addToQueue(video: Video) {
    // Check if the song already exists in the queue
    const songExists = songQueue?.some((song) => song.name === video.name)

    if (songExists) {
      setWarning(
        `"${video.name}" is already in the queue. Do you still want to add it?`,
      )

      // Ask for confirmation if the song exists
      if (
        window.confirm(
          `"${video.name}" is already in the queue. Do you want to add it again?`,
        )
      ) {
        addMutation.mutate(video)
      }
    } else {
      // Add song if it doesn't exist in the queue
      addMutation.mutate(video)
    }
  }

  return (
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
    </div>
  )
}
