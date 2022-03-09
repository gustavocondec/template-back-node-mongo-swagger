import {connect} from 'mongoose'

export const dbConnection = async () => {
  try {
    if (!process.env.MONGODB_URI) throw new Error('No hya mongodb_uri')
    await connect(process.env.MONGODB_URI)
    console.log('Conectado a mongo')
  } catch (error) {
    console.error(error)
    throw new Error('Error a la hora de inicar la BD')
  }
}
