import { Request, Response } from 'express';
import MatchService from '../services/MatchService';
import jwt from '../helpers/jwt';

class TeamController {
  constructor(private service = new MatchService()) { }

  public findAll = async (req: Request, res: Response) => {
    const { inProgress } = req.query;
    const { status, matches } = await this.service.findAll(inProgress as string);
    res.status(status).json([...matches]);
  };

  public create = async (req: Request, res: Response) => {
    const token = req.headers.authorization;
    try {
      jwt.validate(token as string);
    } catch {
      return res.status(401).json({ message: 'Token must be a valid token' });
    }
    try {
      const _match = req.body;
      const { status, match, message } = await this.service.create(
        { ..._match, inProgress: true },
      );
      return res.status(status).json(match || { message });
    } catch {
      const message = 'There is no team with such id!';
      return res.status(404).json({ message });
    }
  };

  public update = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { status } = await this.service.update(id);
    res.status(status).json({ message: 'Finished' });
  };
}

export default TeamController;
