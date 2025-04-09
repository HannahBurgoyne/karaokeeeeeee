import request from 'superagent'
import { NewVideo, Video } from '../../models/Video'

const rootUrl = '/api/v1'

export async function getSongs(): Promise<Video[]> {
  const res = await request.get(rootUrl + '/songs')
  return res.body.songs
}

export async function addSong(newSong: NewVideo) {
  await request.post(rootUrl + '/songs').send({ song: newSong })
}
