const Role = require('../database/role')
const User = require('../database/user')

const isRoleValid = async (rol = '') => {
    const existRole = await Role.findOne({ rol })
    if (!existRole) throw new Error(`El rol ${rol} no exite en la BD.`)
}


const existEmailInDb = async (correo = '') => {
    const existEmail = await User.findOne({ correo })
    if (existEmail) throw new Error(`El correo ${correo} ya existe en la BD.`)
}

const existUserById = async (id = '') => {
    const existUser = await User.findById(id)
    if (!existUser) throw new Error(`El id ${id} mo existe.`)
}

module.exports = {
    isRoleValid,
    existEmailInDb,
    existUserById
}