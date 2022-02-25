const { Schema, model } = require('mongoose')

// schema es como si fuera la declaracion de una clase
const UserSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    password: {
        type: String,
        required: [true, 'La contraseña es requerida']
    },
    correo: {
        type: String,
        required: [true, 'Correo es requerida'],
        unique: true
    },
    img: {
        type: String
    },
    rol: {
        type: String,
        required: true,
        // enum son los valores que puede tomar
        enum: ['ADMIN_ROLE', 'USER_ROLE', 'VENTAS_ROLE']
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
})


/**
 * Cuando al model Use lo pasamos por console o enviamos como json entonces devuelve un json en realida ejecuta la funcion toJSON 
 * ahora la sobreescribiremos para evitar que devuelva algunos valores como passwprd.
 * Ojo: usar function (){ } por la referencia del this 
 *  */

UserSchema.methods.toJSON = function () { // cuando se llame a toJson CONFIGRAMOS LOS ADATOS A MOSTRAR
    const { __v, _id, password, ...user } = this._doc
    user.uid = _id
    return user
}



// exportamos el model de user, // es como si fuera una instancia del schema
module.exports = model('Users', UserSchema)