require('dotenv').config()
import * as request from 'supertest'
import {Server} from '../src/models/server'

const server = new Server()

const pathUsers = '/api/users'
const pathAuth = '/api/auth'

const newUser = {
  name: 'Juan',
  email: 'juan@gmail.com',
  password: '123456',
  role: 'USER_ROLE'
}

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
    const response = await request(server.app).post(pathUsers).send(newUser);
    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      msg: expect.any(String),
      data: expect.any(Array)
    });
    expect(response.body.data[0]).toMatchObject({
      name: expect.any(String),
      email: expect.stringContaining('@'),
      role: expect.stringMatching('USER_ROLE'),
      id: expect.any(String),
      google: expect.any(Boolean)
    });
  })
})

describe('UPDATE /users',  ()=>{
  let userToken=''
  let userId=''
  beforeAll(async ()=>{
    ({userToken, userId} = await login(newUser.email, newUser.password))
  })
  test('update user', async ()=>{
    let newName = 'aea'
    let response = await request(server.app).put(`${pathUsers}/${userId}`)
      .set({Authorization:`Bearer ${userToken}`})
      .send({
        name: newName
      })
    expect(response.status).toBe(200)
    expect(response.body.data[0].name).toBe(newName)
  })
})



describe('DELETE /users', ()=>{
  let userToken=''
  let userId=''
  beforeAll(async ()=>{
    ({userToken, userId} = await login(newUser.email, newUser.password))
    userToken.length
  })
  test('delete user',async ()=>{
    let response = await request(server.app)
      .delete(`${pathUsers}/${userId}`)
      .set({Authorization:`Beater ${userToken}`})

    expect(response.status).toBe(200)
  })
})

async function login(email:string,password:string){
  const response = await request(server.app).post(`${pathAuth}/login`).send({
    email: newUser.email,
    password:newUser.password
  })
  if(response.status!=200) throw new Error('Error login')
  if(!response.body.token) throw new Error('No devolvio Token')
  return {
    userToken : response.body.token,
    userId : response.body.user.id
  }
}
