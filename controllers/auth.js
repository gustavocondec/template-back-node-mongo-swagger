const User = require('../database/user')
const bcryptjs = require('bcrypt')
const { generateJwt } = require('../helpers/jwt')
const { use } = require('bcrypt/promises')


const login = async (req, res) => {
    const { correo, password } = req.body

    //verificar que user este activo
    const user = await User.findOne({ correo })
    if (!user.estado) return res.status(400).json({ msg: 'El usuario esta inactivo' })

    // verficar contraseña
    const validPassword = bcryptjs.compareSync(password, user.password)
    if (!validPassword) return res.status(400).json({ msg: 'Contraseña incorrecta' })

    // generar token
    const token = await generateJwt(user.id)
    console.log('user en auth/login', user.toJSON())
    res.json({
        token,
        user
    })

}


module.exports = {
    login
}
