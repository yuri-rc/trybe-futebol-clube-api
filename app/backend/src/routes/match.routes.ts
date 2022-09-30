import { Router } from 'express';
import MatchController from '../controllers/MatchController';

const router = Router();

const matchController = new MatchController();

router.route('/').get(matchController.findAll);
router.route('/').post(matchController.create);

export default router;
