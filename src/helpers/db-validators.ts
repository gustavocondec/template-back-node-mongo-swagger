import {Role} from '../databaseMongo/role'
import {User} from '../databaseMongo/user'

export const isRoleValid = async (rol = '') => {
  const existRole = await Role.findOne({rol})
  if (!existRole) throw new Error(`El rol ${rol} no exite en la BD.`)
}


export const existEmailInDb = async (correo = '') => {
  const existEmail = await User.findOne({correo})
  if (existEmail) throw new Error(`El correo ${correo} ya existe en la BD.`)
}

export const existUserById = async (id = '') => {
  const existUser = await User.findById(id)
  if (!existUser) throw new Error(`El id ${id} mo existe.`)
}

