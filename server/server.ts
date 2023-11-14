import express from 'express'
import * as Path from 'node:path'

import taskRoutes from './routes/taskRoutes'

const server = express()

server.use(express.json())

if (process.env.NODE_ENV === 'production') {
  server.use(express.static(Path.resolve('public')))
  server.use('/assets', express.static(Path.resolve('./dist/assets')))
  server.get('*', (req, res) => {
    res.sendFile(Path.resolve('./dist/index.html'))
  })
}

server.use('/api/v1/tasks', taskRoutes)

export default server
