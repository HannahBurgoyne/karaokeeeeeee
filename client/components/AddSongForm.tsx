import { useState } from 'react'
import { NewVideo } from '../../models/Video'

export default function AddSongForm() {
  const [name, setName] = useState('')
  const [artist, setArtist] = useState('')
  const [url, setUrl] = useState('')

  function addSong(newSong: NewVideo) {
    console.log(newSong)
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (!name || !artist || !url) return

    const newSong: NewVideo = {
      name,
      artist,
      url,
    }

    addSong(newSong)

    // Reset the form
    setName('')
    setArtist('')
    setUrl('')
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
