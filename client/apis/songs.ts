import request from 'superagent'
import { NewVideo, Video } from '../../models/Video'

const rootUrl = '/api/v1'

export async function getSongs(): Promise<Video[]> {
  const res = await request.get(rootUrl + '/songs')
  return res.body as Video[]
}

export async function addSong(newSong: NewVideo) {
  return await request.post(rootUrl + '/songs').send({ song: newSong })
}
