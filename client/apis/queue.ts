import request from 'superagent'
import { Video } from '../../models/Video'

export async function getQueue(): Promise<Video[]> {
  const res = await request.get('/api/v1/queue')
  return res.body as Video[]
}

export async function addSongToQueue(video: Video) {
  return await request.post('/api/v1/queue').send({ video: video })
}

export async function deleteSongFromQueue(id: number) {
  return await request.delete(`/api/v1/queue/${id}`)
}
