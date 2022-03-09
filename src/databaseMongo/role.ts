import {model, Schema} from 'mongoose'

const RoleSchema = new Schema({
  role: {
    type: String,
    require: [true, 'El rol es obligatorio']
  }
})

export const Role = model('Role', RoleSchema)

