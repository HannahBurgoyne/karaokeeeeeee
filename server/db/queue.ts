import connection from './connection.ts'
import { Video } from '../../models/Video.ts'

export async function getQueue(db = connection): Promise<Video[]> {
  return db('queue').select()
}

export async function addSongToQueue(song: Video, db = connection) {
  return db('queue').insert(song)
}
