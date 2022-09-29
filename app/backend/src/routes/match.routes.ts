import { Router } from 'express';
import MatchController from '../controllers/MatchController';

const router = Router();

const matchController = new MatchController();

router.route('/').get(matchController.findAll);

export default router;
