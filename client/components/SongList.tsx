import { useQueryClient, useQuery, useMutation } from '@tanstack/react-query'
import { getSongs } from '../apis/songs'
import { Video } from '../../models/Video'
import { addSongToQueue, getQueue } from '../apis/queue'
import { useState } from 'react'
import AddSongForm from './AddSongForm'

export default function SongList() {
  const [warning, setWarning] = useState<string | null>(null)
  const [showSongForm, setShowSongForm] = useState<boolean>(false)
  const [sortBy, setSortBy] = useState<'artist' | 'name'>('artist')
  const [searchTerm, setSearchTerm] = useState('')

  const { data } = useQuery({ queryKey: ['songs'], queryFn: getSongs })
  const { data: songQueue } = useQuery({
    queryKey: ['queue'],
    queryFn: getQueue,
    refetchInterval: 3000,
  })

  const queryClient = useQueryClient()

  const addMutation = useMutation({
    mutationFn: (video: Video) => addSongToQueue(video),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['queue'] })
    },
  })

  function addToQueue(video: Video) {
    const songExists = songQueue?.some((song) => song.name === video.name)

    if (songExists) {
      setWarning(
        `"${video.name}" is already in the queue. Do you still want to add it?`,
      )

      if (
        window.confirm(
          `"${video.name}" is already in the queue. Do you want to add it again?`,
        )
      ) {
        addMutation.mutate(video)
      }
    } else {
      addMutation.mutate(video)
    }
  }

  // Filter & sort the songs
  const filteredSongs = data
    ?.filter((video) =>
      `${video.name} ${video.artist}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase()),
    )
    .sort((a, b) =>
      sortBy === 'artist'
        ? a.artist.localeCompare(b.artist, undefined, { sensitivity: 'base' })
        : a.name.localeCompare(b.name, undefined, { sensitivity: 'base' }),
    )

  return (
    <div className="p-6 max-w-xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
        <h1 className="text-2xl font-bold text-purple-600">
          Pick your next song 🎤
        </h1>
      </div>

      <input
        type="text"
        placeholder="Search by song or artist..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full px-4 py-2 mb-4 border border-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
      />
      <div className="">
        <button
          className="text-sm hover:text-pink-300 text-pink-500 text-right  flex ml-auto py-2 rounded"
          onClick={() =>
            setSortBy((prev) => (prev === 'artist' ? 'name' : 'artist'))
          }
        >
          Sort by: {sortBy === 'artist' ? 'Artist' : 'Song'}
        </button>
        <ul className="space-y-2">
          {filteredSongs?.map((video) => (
            <li
              key={video.id}
              className="flex justify-between text-purple-500 items-center"
            >
              <span>
                {video.name} - {video.artist}
              </span>
              <button
                className="bg-pink-500 text-black px-3 py-1 rounded"
                onClick={() => addToQueue(video)}
              >
                +
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-6">
        <button
          className="bg-pink-500 p-2 flex justify-center items-center rounded-md my-10"
          onClick={() => setShowSongForm(true)}
        >
          Add a new song
        </button>
        {showSongForm && <AddSongForm setShowSongForm={setShowSongForm} />}
      </div>
    </div>
  )
}
