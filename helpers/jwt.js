const jwt = require('jsonwebtoken')

const generateJwt = async (uid = '') => {
    return new Promise((resolve, reject) => {
        const payload = {
            uid
        }
        jwt.sign(payload, process.env.SECRETORPRIVATEKEY, {
            expiresIn: '4h'
        }, (err, token) => {
            if (err) reject('Error creando token', err)
            resolve(token)
        })
    })
}


module.exports = {
    generateJwt
}