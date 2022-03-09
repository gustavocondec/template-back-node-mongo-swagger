/**
 * @description Role must be 'ADMIN_ROLE'
 */
import {NextFunction, Request, Response} from 'express';

export const isAdminRole = (req:Request, res:Response, next:NextFunction) => {

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  if (!req.userAuthenticated) return res.status(500).json({msg: 'req.user is undefined'})

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const {rol} = req.userAuthenticated

  if (rol != 'ADMIN_ROLE') return res.status(400).json({msg: 'Solo los admin pueden borrar.'})

  return next()
}

export const hasRole = (...roles: any[]) => {
  console.log('ROLES', roles)
  return (req:Request, res:Response, next:NextFunction) => {
    next()
  }
}
