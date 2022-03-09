import {NextFunction, Request, Response} from 'express';

import {verify} from 'jsonwebtoken'
import {User} from '../databaseMongo/user'

export const validarJWT = async (req:Request, res:Response, next:NextFunction) => {
  const bearer = req.header('Authorization')
  if (!bearer) return res.status(400).json({
    msg: 'Debe enviar token'
  })
  try {
    const token = bearer.trim().split(/ +/)[1]
    if (!process.env.SECRETORPRIVATEKEY) throw new Error('No se definio secreto')
    const payload = verify(token, process.env.SECRETORPRIVATEKEY)
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const userAuthenticated = await User.findById(payload.uid)
    if (!userAuthenticated) return res.status(404).json({msg: 'no exite'})
    if (userAuthenticated.isDeleted) return res.status(404).json({msg: 'User not found'})
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    req.user = userAuthenticated.toJSON()
    return next()
  } catch (error) {
    console.log(error)
    res.status(401).json({
      msg: 'Token invalido'
    })
  }


}
