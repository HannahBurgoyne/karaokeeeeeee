import { useQueryClient, useQuery, useMutation } from '@tanstack/react-query'
import { getSongs } from '../apis/songs'
import { Video } from '../../models/Video'
import { addSongToQueue } from '../apis/queue'

export default function SongList() {
  const { data } = useQuery({ queryKey: ['songs'], queryFn: getSongs })
  const queryClient = useQueryClient()

  // add a new song to the queue
  const addMutation = useMutation({
    mutationFn: (video: Video) => addSongToQueue(video),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['queue'] })
    },
  })

  function addToQueue(video: Video) {
    addMutation.mutate(video)
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
