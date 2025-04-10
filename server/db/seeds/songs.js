import songsBackup from '../backup-data/backupSongs.js'

export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('songs').del()

  // Inserts seed entries
  await knex('songs').insert(songsBackup)
}
