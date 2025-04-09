export async function up(knex) {
  return knex.schema.createTable('queue', (table) => {
    table.increments('id')
    table.string('name')
    table.string('artist')
    table.string('url')
  })
}

export async function down(knex) {
  return knex.schema.dropTable('queue')
}
