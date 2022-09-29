import { Request, Response } from 'express';
import MatchService from '../services/MatchService';

class TeamController {
  constructor(private service = new MatchService()) { }

  // private httpErrors = (httpError: number) => {
  //   switch (httpError) {
  //     case 400:
  //       return 'All fields must be filled';
  //     case 401:
  //       return 'Incorrect email or password';
  //     case 200:
  //     default:
  //   }
  // };

  public findAll = async (req: Request, res: Response) => {
    const { inProgress } = req.query;
    const { status, matches } = await this.service.findAll(inProgress as string);
    res.status(status).json([...matches]);
  };
}

export default TeamController;
