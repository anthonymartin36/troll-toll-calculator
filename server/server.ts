import express from 'express'
import * as Path from 'node:path'
import * as URL from 'node:url'

import bridgeRoutes from './routes/bridges.ts'
import authRoutes from './routes/auth.ts'
//import * as dotenv from 'dotenv'
//import mapRoutes from './routes/maps.ts'

// const __filename = URL.fileURLToPath(import.meta.url)
// const __dirname = Path.dirname(__filename)

const server = express()

//dotenv.config()
server.use(express.urlencoded({ extended: true }))

server.use(express.json())
//server.use(express.static(Path.join(__dirname, 'public')))

server.use('/api/v1/bridges', bridgeRoutes)
server.use('/api/v1/auth', authRoutes)

if (process.env.NODE_ENV === 'production') {
  server.use(express.static(Path.resolve('public')))
  //server.use('/image', express.static('client/image'))
  server.use('/assets', express.static(Path.resolve('./dist/assets')))
  server.get('*', (req, res) => {
    res.sendFile(Path.resolve('./dist/index.html'))
  })

}

export default server
