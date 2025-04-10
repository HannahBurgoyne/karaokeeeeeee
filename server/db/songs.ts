import connection from './connection.ts'
import { NewVideo, Video } from '../../models/Video.ts'
import fs from 'fs'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import path from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const seedFilePath = path.join(__dirname, './backup-data/backupSongs.js')

export async function getAllSongs(db = connection): Promise<Video[]> {
  return db('songs').select()
}

export async function addSong(newSong: NewVideo, db = connection) {
  // First insert into the database
  await db('songs').insert(newSong)

  // Then append to the seed file
  try {
    const fileContent = fs.readFileSync(seedFilePath, 'utf-8')
    const songs = JSON.parse(fileContent)

    // Optional: check if song already exists to avoid duplication
    const alreadyExists = songs.some(
      (song: NewVideo) =>
        song.name === newSong.name && song.artist === newSong.artist,
    )

    if (!alreadyExists) {
      songs.push(newSong)
      fs.writeFileSync(seedFilePath, JSON.stringify(songs, null, 2))
    }
  } catch (err) {
    console.error('Failed to update seed file:', err)
  }
}
