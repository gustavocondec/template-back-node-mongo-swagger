const mongoose = require('mongoose')

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log('Conectado a la bd')
    } catch (error) {
        console.error(error)
        throw new Error('Error a la hora de inicar la BD')
    }
}

module.exports = {
    dbConnection
}