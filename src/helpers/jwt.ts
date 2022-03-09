import {sign} from 'jsonwebtoken'

export const generateJwt = async (uid = '') => {
  return new Promise((resolve, reject) => {
    const payload = {
      uid
    }
    if (!process.env.SECRETORPRIVATEKEY) throw new Error('No se definio secreto para jwt')
    sign(payload, process.env.SECRETORPRIVATEKEY, {
      expiresIn: '4h'
    }, (err, token) => {
      if (err) reject(err)
      resolve(token)
    })
  })
}
