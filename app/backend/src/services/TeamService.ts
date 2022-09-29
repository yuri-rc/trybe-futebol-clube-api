import TeamModel from '../models/TeamModel';
import TeamDTO from '../dtos/TeamDTO';

type ResponseFindAll = {
  status: number,
  teams: TeamDTO[]
};

type ResponseFindByPk = {
  status: number,
  team?: TeamDTO
};

export default class TeamService {
  public model: TeamModel;

  constructor() {
    this.model = new TeamModel();
  }

  public async findAll(): Promise<ResponseFindAll> {
    const teams = await this.model.findAll();
    return { status: 200, teams };
  }

  public async findByPk(id: string): Promise<ResponseFindByPk> {
    const team = await this.model.findByPk(id);
    return { status: 200, team };
  }
}
