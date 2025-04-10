import { Video } from '../../models/Video'

interface Props {
  queue: Video[]
  currentIndex: number
}

export default function Queue({ queue, currentIndex }: Props) {
  return (
    <div className="p-4 flex items-center bg-purple-600 rounded-md m-8">
      {queue[currentIndex + 1] ? (
        <h2 className="text-xl font-semibold" key={queue[currentIndex + 1].id}>
          Up Next: {queue[currentIndex + 1].name} -{' '}
          {queue[currentIndex + 1].artist}
        </h2>
      ) : (
        <h2>No more songs in the queue</h2>
      )}
    </div>
  )
}
