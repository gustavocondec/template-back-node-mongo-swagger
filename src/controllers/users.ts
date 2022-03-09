import {Request, Response} from 'express';

import {User} from '../databaseMongo/user'
import * as bcryptjs from 'bcrypt'

export const getUsers = async (req: Request, res: Response) => {
  const {limit = 5, from = 0} = req.query
  const queryActives = {isDeleted: false}

  const [users, total] = await Promise.all([
    User.find(queryActives) // los que estan activos (o no borrados)
      .skip(Number(from)) // desde que posicion de la consulta // cuanta desde 0
      .limit(Number(limit)), // cuantos resultados traera
    User.countDocuments(queryActives)
  ])
  res.status(200).json({
    total,
    msg: 'ok',
    data: users
  })
}

export const postUsers = async (req: Request, res: Response) => {

  // campo google no lo llena el usuario, con destructuracion eliminanmos los campos innecesarios y prohibidos

  const {name, email, role} = req.body
  let {password} = req.body
  // encriptar contraseña
  const salt = bcryptjs.genSaltSync()
  password = bcryptjs.hashSync(password, salt)


  const user = new User({name, email, password, role})
  const newUser = await user.save()

  res.status(200).send({
    msg: 'ok',
    data: [
      {
        ...newUser.toJSON()
      }
    ]
  })

}

// Update User By Id
export const putUsers = async (req: Request, res: Response) => {
  const {id} = req.params
  // Separamos campos que no se pueden editar de los que si, como password, etc
  const {_id, google, ...resto} = req.body
  let {password} = req.body
  delete resto.id

  //TODO validar contra la BD
  if (password) {
    // encriptar contraseña
    const salt = bcryptjs.genSaltSync()
    password = bcryptjs.hashSync(password, salt)
  }

  await User.findByIdAndUpdate(id, resto)

  const user = await User.findById(id)
  res.json({
    msg: 'putUsers',
    data: [
      {
        ...user.toJSON()
      }
    ]
  })
}

export const deleteUsers = async (req: Request, res: Response) => {
  const {id} = req.params

  await User.findByIdAndUpdate(id, {isDeleted: true})
  res.json({
    msg: 'deleteUsers'
  })
}
