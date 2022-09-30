import { Request, Response } from 'express';
import MatchService from '../services/MatchService';
import jwt from '../helpers/jwt';

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

  public create = async (req: Request, res: Response) => {
    const token = req.headers.authorization;
    try {
      jwt.validate(token as string);
      const _match = req.body;
      const { status, match } = await this.service.create({ ..._match, inProgress: true });
      return res.status(status).json(match);
    } catch {
      return res.status(401).json({ message: 'Token must be a valid token' });
    }
  };
}

export default TeamController;
