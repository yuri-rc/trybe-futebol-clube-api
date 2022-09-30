import MatchModel from '../models/MatchModel';
import MatchDTO from '../dtos/MatchDTO';

type ResponseFindAll = {
  status: number,
  matches: MatchDTO[]
};

type ResponseCreate = {
  status: number,
  match?: MatchDTO,
  message?: string
};

export default class MatchService {
  public model: MatchModel;

  constructor() {
    this.model = new MatchModel();
  }

  public async findAll(inProgress?: string): Promise<ResponseFindAll> {
    if (inProgress === undefined) {
      const matches = await this.model.findAll();
      return { status: 200, matches };
    }
    const filteredMatches = await this.model.findAllInProgress(inProgress as string);
    return { status: 200, matches: filteredMatches };
  }

  public async create(_match: MatchDTO): Promise<ResponseCreate> {
    if (_match.homeTeam === _match.awayTeam) {
      return { status: 401, message: 'It is not possible to create a match with two equal teams' };
    }
    const match = await this.model.create(_match);
    return { status: 201, match };
  }

  public async updateInProgress(id: string) {
    await this.model.updateInProgress(id);
    return { status: 200 };
  }

  public async updateTeamGoals(
    id: string,
    homeTeamGoals: number,
    awayTeamGoals: number,
  ) {
    await this.model.updateTeamGoals(id, homeTeamGoals, awayTeamGoals);
    return { status: 200 };
  }
}
