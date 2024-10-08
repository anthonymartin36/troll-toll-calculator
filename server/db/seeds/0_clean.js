export async function seed(knex) {
  await knex('favourite-bridges').del()
  await knex('bridges').del()
  await knex('troll-users').del()
  await knex('toll-collected').del()
}
