const jwt = require('jsonwebtoken')
const User = require('../database/user')

const validarJWT = async (req, res, next) => {
    const token = req.header('x-token')
    if (!token) return res.status(400).json({
        msg: 'Debe enviar token'
    })

    try {
        console.log('token', token)

        let { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY)
        req.uid = uid
        console.log('uid', uid)
        let userAuthenticated = await User.findById(uid)
        if (!userAuthenticated) return res.status(401).json({ msg: 'no exite' })
        if (!userAuthenticated.estado) return res.status(401).json({ msg: 'Usuario is disabled' })
        req.userAuthenticated = userAuthenticated
        next()
    } catch (error) {
        res.status(401).json({
            msg: 'Token invalido'
        })
    }


}

module.exports = {
    validarJWT
}