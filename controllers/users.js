const User = require('../database/user')
const bcryptjs = require('bcrypt')

const getUsers = async (req, res) => {
    let { limit = 5, from = 0 } = req.query
    let queryActives = { estado: true }

    const [users, total] = await Promise.all([
        User.find(queryActives) // los que estan activos (o no borrados)
            .skip(Number(from)) // desde que posicion de la consulta // cuanta desde 0
            .limit(Number(limit)), // cuantos resultados traera

        User.countDocuments(queryActives)
    ])
    res.json({
        total,
        users
    })
}

const postUsers = async (req, res) => {

    // campo google no lo llena el usuario, con destructuracion eliminanmos los campos innecesarios y prohibidos

    let { nombre, correo, password, rol } = req.body

    // encriptar contraseña
    const salt = bcryptjs.genSaltSync()
    password = bcryptjs.hashSync(password, salt)


    const user = new User({ nombre, correo, password, rol })

    let newUser = await user.save()

    res.status(200).send(newUser)

}

// Update User By Id
const putUsers = async (req, res) => {
    const { id } = req.params
    // Separamos campos que no se pueden editar de los que si, como password, etc
    let { _id, password, google, ...resto } = req.body
    delete resto.id

    //TODO validar contra la BD
    if (password) {
        // encriptar contraseña
        const salt = bcryptjs.genSaltSync()
        password = bcryptjs.hashSync(password, salt)
    }

    const user = await User.findByIdAndUpdate(id, resto)
    res.json({
        msg: 'putUsers',
        user
    })
}

const deleteUsers = async (req, res) => {
    let { id } = req.params

    let userAuthenticated = req.user


    await User.findByIdAndUpdate(id, { estado: false })
    res.json({
        msg: 'deleteUsers',
        userAuthenticated
    })
}


module.exports = {
    getUsers,
    postUsers,
    putUsers,
    deleteUsers
}