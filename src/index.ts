require('dotenv').config()

console.log('process.env.NODE_ENV', process.env)
import {Server} from './models/server'

const server = new Server()

server.listen()

