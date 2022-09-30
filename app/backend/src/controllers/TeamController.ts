import { Request, Response } from 'express';
import TeamService from '../services/TeamService';

class TeamController {
  constructor(private service = new TeamService()) { }

  public findAll = async (req: Request, res: Response) => {
    const { status, teams } = await this.service.findAll();
    res.status(status).json([...teams]);
  };

  public findByPk = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { status, team } = await this.service.findByPk(id);
    res.status(status).json(team);
  };
}

export default TeamController;
