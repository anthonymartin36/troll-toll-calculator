export async function up(knex) { //.withSchema('public')
  await knex.schema.createTable('troll-users', (table) => {
    table.increments('id').primary()
    table.integer('active_bridge_id').nullable()
    table.string('email')
    table.string('first_name')
    table.string('last_name')
    table.string('auth0_id')
  })
}

export async function down(knex) {
  await knex.schema.dropTable('users')
}
