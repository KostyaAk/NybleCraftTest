import { Router } from 'express'
import { pdf, image, signup, login,getOne , getAll, createUser, update, deleteUser} from '../controllers/userController'
 
const router = Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/getall', getAll);
router.post('/create', createUser);
router.post('/image/:id', image);
router.post('/pdf', pdf);
router.get('/getone/:id', getOne);
router.put('/update/:id', update);
router.delete('/delete/:id', deleteUser);

export default router;