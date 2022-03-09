const {Router} = require('express')
const {check} = require('express-validator')

const {getUsers, postUsers, putUsers, deleteUsers} = require('../controllers/users')
const {isRoleValid, existEmailInDb, existUserById} = require('../helpers/db-validators')
const {validarCampos, validarJWT, hasRole} = require('../middlewares')
const router = Router()


router.get('/', getUsers)


router.post('/', [
  check('name', 'El nombre es obligatorio').not().isEmpty(),
  check('password', 'El password debe tener 6 caracteres').isLength({min: 6}),
  check('email', 'El correo no es valido').isEmail(),
  // Check if rol exist in DB
  check('email').custom(existEmailInDb),
  //check('rol', 'No es un rol valido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
  check('role').custom(isRoleValid),
  // Al final valida si hay errores en la validacion de express-validators(los check) y si hay lanza error
  validarCampos
], postUsers)

router.put('/:id', [
  check('id', 'No es un ID Valido').isMongoId(),
  check('id').custom(existUserById),
  check('role').custom(isRoleValid), //depende de la logica validar o permitir si cambia de rol
  validarCampos
], putUsers)

router.delete('/:id', [
  validarJWT,
  // isAdminRole,
  hasRole('ADMIN_ROLE'),
  check('id', 'No es un ID Valido').isMongoId(),
  check('id').custom(existUserById),
  validarCampos
], deleteUsers)

module.exports = router
