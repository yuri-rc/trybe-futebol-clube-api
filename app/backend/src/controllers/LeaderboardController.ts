import { Request, Response } from 'express';
import LeaderBoardService from '../services/LeaderboardService';

class LeaderboardController {
  constructor(private service = new LeaderBoardService()) { }

  public findAll = async (req: Request, res: Response) => {
    const { status, matches } = await this.service.findAll();
    res.status(status).json([...matches]);
  };
}

export default LeaderboardController;
