import * as Path from 'node:path'
import * as URL from 'node:url'

import * as dotenv from 'dotenv'

dotenv.config() 

const __filename = URL.fileURLToPath(import.meta.url)
const __dirname = Path.dirname(__filename)

export default {
  // development: {
  //   client: 'pg',
  //   useNullAsDefault: true,
  //   connection:  'postgresql://user:w6Vt196ilWZ91EJ7M6b823oGXEdSTheR@dpg-cr6htmlds78s73btvbhg-a.singapore-postgres.render.com/trolltollcalculator_y2fr?ssl=true', //process.env.DATABASE_URL,
  //   migrations: {
  //     directory: "./migrations", 
  //     schemaName: 'public',
  //   },
  //   seeds: {
  //     directory: './seeds',
  //   }
  // },
  development: {
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
      filename: Path.join(__dirname, 'dev.sqlite3'),
    },
    pool: {
      afterCreate: (conn, cb) => conn.run('PRAGMA foreign_keys = ON', cb),
    },
  },

  test: {
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
      filename: ':memory:',
    },
    migrations: {
      directory: Path.join(__dirname, 'migrations'),
    },
    seeds: {
      directory: Path.join(__dirname, 'seeds'),
    },
    pool: {
      afterCreate: (conn, cb) => conn.run('PRAGMA foreign_keys = ON', cb),
    },
  },

  production: {
    client: 'pg',
    useNullAsDefault: true,
    connection:  process.env.DATABASE_URL,
    migrations: {
      directory: "./migrations", 
      schemaName: 'public',
    }
  },
}
