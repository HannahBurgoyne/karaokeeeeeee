export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('songs').del()

  // Inserts seed entries
  await knex('songs').insert([
    { id: 1, name: 'banana', artist: 'bananaman', url: 'fakeurl.com' },
  ])
}
