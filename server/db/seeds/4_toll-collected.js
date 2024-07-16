export async function seed(knex) {
  await knex('toll-collected').insert([
    {
      bridge_id: 1,
      timestamp: knex.fn.now(),
      revenue: 100.0,
    },
    {
      bridge_id: 8,
      timestamp: knex.fn.now(),
      revenue: 10.5,
    },
    {
      bridge_id: 13,
      timestamp: knex.fn.now(),
      revenue: 374.53,
    },
  ])
}
