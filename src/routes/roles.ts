import {Router} from 'express';
import {postRoles} from '../services/roles';


const router = Router()



router.post('/', postRoles)





module.exports = router
