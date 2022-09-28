import { Router } from 'express';
import UserController from '../controllers/UserController';

const router = Router();

const userController = new UserController();

router.route('/login')
  .post(userController.login);
router.route('/login/validate')
  .get(userController.validateLogin);

export default router;
