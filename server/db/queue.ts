import connection from './connection.ts'
import { Video } from '../../models/Video.ts'

export async function getQueue(db = connection): Promise<Video[]> {
  return db('queue').select()
}

export async function addSongToQueue(song: Video, db = connection) {
  // Remove id from the song object before inserting
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { id, ...songWithoutId } = song
  return db('queue').insert(songWithoutId)
}
