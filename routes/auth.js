const { Router } = require('express')
const { check } = require('express-validator')
const { login } = require('../controllers/auth')
const { existEmailInDb } = require('../helpers/db-validators')
const { validarCampos } = require('../middlewares/validar-campos')
const { validarJWT } = require('../middlewares/validar-jwt')

//const { validarCampos } = require('../middlewares/validar-campos')
const router = Router()


router.post('/login', [
    check('correo', 'El correo es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatorio').not().isEmpty(),
    check('correo', 'Correo no exste').not().custom(existEmailInDb),
    validarCampos
], login)


module.exports = router
