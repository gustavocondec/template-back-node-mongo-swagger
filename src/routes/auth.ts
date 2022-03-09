import {Router} from 'express'

import {check} from 'express-validator'
import {login} from '../controllers/auth'
import {existEmailInDb} from '../helpers/db-validators'
import {validarCampos} from '../middlewares/validar-campos'

//const { validarCampos } from'../middlewares/validar-campos')
const router = Router()


router.post('/login', [
  check('email', 'El correo es obligatorio').isEmail(),
  check('password', 'La contraseña es obligatorio').not().isEmpty(),
  check('email', 'Correo no exste').not().custom(existEmailInDb),
  validarCampos
], login)


module.exports = router

