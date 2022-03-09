import {Request, Response, NextFunction} from 'express';
import {createRoles} from '../controllers/roles';

export const postRoles =async (req:Request, res:Response, next:NextFunction) => {
  try {
    await createRoles()
    res.send('Ok')
  } catch (e) {
    next(e)
  }
}
