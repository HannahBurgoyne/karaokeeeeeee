import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { addSong } from '../apis/songs'

interface Props {
  setShowSongForm: React.Dispatch<React.SetStateAction<boolean>>
}

export default function AddSongForm({ setShowSongForm }: Props) {
  const [name, setName] = useState('')
  const [artist, setArtist] = useState('')
  const [url, setUrl] = useState('')
  const [file, setFile] = useState<File | null>(null)

  const queryClient = useQueryClient()

  const addMutation = useMutation({
    mutationFn: (newSong: FormData) => addSong(newSong),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['songs'] })
    },
  })

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      setFile(e.target.files?.[0])
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (!name || !artist || !file) return // Ensure a file is provided

    const formData = new FormData()
    formData.append('video', file)
    formData.append('name', name)
    formData.append('artist', artist)

    addMutation.mutate(formData)

    // Reset the form
    setName('')
    setArtist('')
    setUrl('')
    setFile(null)

    setShowSongForm(false)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-4 bg-white shadow rounded-xl space-y-4"
      encType="multipart/form-data"
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

      {/* File upload input */}
      <input
        type="file"
        name="video"
        accept="video/*"
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
