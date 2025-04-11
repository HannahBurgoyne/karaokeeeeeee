import fs from 'fs'
import path from 'path'

// Use import.meta.url to get the current module's URL
const __filename = new URL(import.meta.url).pathname
const __dirname = path.dirname(__filename)

// Now you can resolve the path like before
const filePath = path.resolve(__dirname, '../backup-data/backupSongs.json')
const songsBackup = JSON.parse(fs.readFileSync(filePath, 'utf-8'))

export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('songs').del()

  // Inserts seed entries
  await knex('songs').insert(songsBackup)
}
