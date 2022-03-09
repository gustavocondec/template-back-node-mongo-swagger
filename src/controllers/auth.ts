import {Request, Response} from 'express';

import {User} from '../databaseMongo/user'
import {compareSync} from 'bcrypt'
import {generateJwt} from '../helpers/jwt'


export const login = async (req: Request, res: Response) => {
  const {email, password} = req.body

  //verificar que user este activo
  const user = await User.findOne({email})
  if (user.isDeleted) return res.status(400).json({msg: 'El usuario esta inactivo'})

  // verficar contraseña
  const validPassword = compareSync(password, user.password)
  if (!validPassword) return res.status(400).json({msg: 'Contraseña incorrecta'})

  // generar token
  const token = await generateJwt(user.id)
  console.log('user en auth/login', user.toJSON())
  return res.json({
    token,
    user
  })

}

