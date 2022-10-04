import { Router } from 'express';
import login from './login.routes';
import team from './team.routes';
import match from './match.routes';
import leaderboard from './leaderboar.routes';

const router = Router();

router.use('/login', login);
router.use('/teams', team);
router.use('/matches', match);
router.use('/leaderboard', leaderboard);
export default router;
