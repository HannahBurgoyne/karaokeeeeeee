import request from 'superagent'
import { Video } from '../../models/Video'

export async function getQueue(): Promise<Video[]> {
  const res = await request.get('/api/v1/queue')
  return res.body as Video[]
}

export async function addToQueue(video: Video) {
  return request.post('/api/v1/queue').send({ video: video })
}
