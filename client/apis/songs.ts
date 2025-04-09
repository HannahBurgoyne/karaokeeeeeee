import request from 'superagent'
import { Video } from '../../models/Video'

const rootUrl = '/api/v1'

export async function getSongs(): Promise<Video[]> {
  const res = await request.get(rootUrl + '/songs')
  return res.body as Video[]
}

export async function addSong(newSong: FormData) {
  console.log('api', newSong)
  return await request.post(rootUrl + '/songs').send(newSong)
}
