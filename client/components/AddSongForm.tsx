import { useState } from 'react'
import { NewVideo } from '../../models/Video'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { addSong } from '../apis/songs'

export default function AddSongForm() {
  const [name, setName] = useState('')
  const [artist, setArtist] = useState('')
  const [url, setUrl] = useState('')
  const [file, setFile] = useState<File | null>(null)

  const queryClient = useQueryClient()

  const addMutation = useMutation({
    mutationFn: (newSong: NewVideo & { file: File | null }) => addSong(newSong),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['songs'] })
    },
  })

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      setFile(e.target.files[0])
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (!name || !artist || !file) return // Ensure a file is provided

    const newSong: NewVideo & { file: File | null } = {
      name,
      artist,
      url,
      file,
    }

    addMutation.mutate(newSong)

    // Reset the form
    setName('')
    setArtist('')
    setUrl('')
    setFile(null)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-4 bg-white shadow rounded-xl space-y-4"
    >
      <h2 className="text-xl font-bold text-center">Add a New Karaoke Song</h2>

      <input
        type="text"
        placeholder="Song Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full border border-gray-300 rounded p-2"
        required
      />

      <input
        type="text"
        placeholder="Artist"
        value={artist}
        onChange={(e) => setArtist(e.target.value)}
        className="w-full border border-gray-300 rounded p-2"
        required
      />

      <input
        type="url"
        placeholder="Video URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="w-full border border-gray-300 rounded p-2"
      />

      {/* File upload input */}
      <input
        type="file"
        name="video"
        accept="video/mp4"
        onChange={handleFileChange}
        className="w-full border border-gray-300 rounded p-2"
        required
      />

      <button
        type="submit"
        className="w-full bg-pink-500 hover:bg-pink-600 text-white font-semibold py-2 px-4 rounded"
      >
        Add Song
      </button>
    </form>
  )
}
