import Sidebar from './Sidebar'
import SongList from './SongList'

export default function SongsPage() {
  return (
    <main className="flex min-h-screen">
      <div className="w-3/4 p-4">
        <SongList />
      </div>
      <aside className="min-h-screen w-1/4 bg-pink-500 shadow-2xl z-10">
        <Sidebar />
      </aside>
    </main>
  )
}
