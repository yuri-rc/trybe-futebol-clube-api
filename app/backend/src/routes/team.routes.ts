import { Router } from 'express';
import TeamController from '../controllers/TeamController';

const router = Router();

const teamController = new TeamController();

router.route('/').get(teamController.findAll);
router.route('/:id').get(teamController.findByPk);

export default router;
