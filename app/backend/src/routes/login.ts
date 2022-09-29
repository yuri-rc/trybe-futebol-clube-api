import { Router } from 'express';
import UserController from '../controllers/UserController';

const router = Router();

const userController = new UserController();

router.route('/').post(userController.login);
router.route('/validate').get(userController.validateLogin);

export default router;
