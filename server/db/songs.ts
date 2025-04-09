import connection from './connection.ts'
import { NewVideo, Video } from '../../models/Video.ts'

export async function getAllSongs(db = connection): Promise<Video[]> {
  return db('songs').select()
}

export async function addSong(newSong: NewVideo, db = connection) {
  return db('songs').insert(newSong)
}
