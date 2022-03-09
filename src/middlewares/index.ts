import * as validarCampos from './validar-campos'
import * as validarJWT from './validar-jwt'
import * as hasRole from './validar-roles'

module.exports = {
  ...validarCampos,
  ...validarJWT,
  ...hasRole
}
