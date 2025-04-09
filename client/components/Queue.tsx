import { Video } from '../../models/Video'

interface Props {
  queue: Video[]
  currentIndex: number
}

export default function Queue({ queue, currentIndex }: Props) {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Up Next</h2>
      <ol className="list-decimal list-inside">
        {queue.slice(currentIndex + 1).map((video, index) => (
          <li key={`${video.id} ${index}`}>{video.name}</li>
        ))}
      </ol>
    </div>
  )
}
