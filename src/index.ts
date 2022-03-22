require('dotenv').config()

import {Server} from './models/server'

const server = new Server()

const initServer = async () => {
  await server.initialize()
  await server.listen()
}

void initServer()
