require('dotenv').config()
import * as request from 'supertest'
import {Server} from '../src/models/server'


const server = new Server()

const pathUsers = '/api/users'

beforeAll(async () => {
  await server.initialize()
})

describe('GET /users',() => {
  test('Should respond with status a 200', async () => {

    const response = await request(server.app).get(pathUsers).send()

    expect(response.status).toBe(200)

  })
})
describe('POST /users', () => {
  test('Create user', async () => {
    const response = await request(server.app).post(pathUsers).send({
      name: 'Juan',
      email: 'juan@gmail.com',
      password: '123456',
      role: 'USER_ROLE'
    })
    console.log(response.body)
    expect(response.status).toBe(200)
    expect(response.body).toMatchObject({
      msg: expect.any(String),
      data: expect.any(Array)
    })
    expect(response.body.data[0]).toMatchObject({
      name: expect.any(String),
      email: expect.stringContaining('@'),
      role: expect.stringMatching('USER_ROLE'),
      id: expect.any(String),
      google: expect.any(Boolean)
    })
  })
})


