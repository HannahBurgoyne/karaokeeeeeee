import { Video } from '../../models/Video'

interface Props {
  queue: Video[]
  currentIndex: number
}

export default function Queue({ queue, currentIndex }: Props) {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Up Next</h2>
      <ul className="list-inside">
        {queue[currentIndex + 1] ? (
          <li key={queue[currentIndex + 1].id}>
            {queue[currentIndex + 1].name}
          </li>
        ) : (
          <li>No more songs in the queue</li>
        )}
      </ul>
    </div>
  )
}
