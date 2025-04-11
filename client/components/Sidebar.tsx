import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { deleteSongFromQueue, getQueue } from '../apis/queue'

export default function Sidebar() {
  const queryClient = useQueryClient()
  const { data: queue } = useQuery({
    queryKey: ['queue'],
    queryFn: getQueue,
    refetchInterval: 3000,
  })

  const deleteSongMutation = useMutation({
    mutationFn: (videoId: number) => deleteSongFromQueue(videoId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['queue'] }) // Refresh the queue after deletion
    },
  })

  function handleDeleteSong(videoId: number) {
    deleteSongMutation.mutate(videoId)
  }

  if (queue)
    return (
      <section className="overflow-visible">
        <h2 className="text-xl shadow-xl p-5">Song Queue</h2>
        <ul className="overflow-visible">
          {queue?.map((song, idx) => (
            <li
              className="p-4 bg-pink-500 shadow-l flex justify-between items-center rounded overflow-visible"
              key={`${song.id}: ${idx}`}
              style={{
                boxShadow: `
                 0 -4px 6px -4px rgba(0, 0, 0, 0.1),
                 0 4px 6px -4px rgba(0, 0, 0, 0.1),
                 inset 0 0 20px rgba(0, 0, 0, 0.2)
               `,
              }}
            >
              <span className="flex-1">
                {song.artist} - {song.name}
              </span>
              <button
                className="p-2 ml-2 text-white rounded"
                onClick={() => handleDeleteSong(song.id)}
              >
                <img
                  className="w-[2em]"
                  src="/icons/trash-can.png"
                  alt="delete button"
                />
              </button>
            </li>
          ))}
        </ul>
      </section>
    )
}
