export async function up(knex) {
  await knex.schema.createTable('toll-collected', (table) => {
    table.increments('id').primary()
    table.integer('bridge_id').references('bridges.id')
    table.datetime('timestamp')
    table.decimal('revenue')
  })
}

export async function down(knex) {
  await knex.schema.dropTable('toll-collected')
}
