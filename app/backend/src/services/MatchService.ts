import MatchModel from '../models/MatchModel';
import MatchDTO from '../dtos/MatchDTO';

type ResponseFindAll = {
  status: number,
  matches: MatchDTO[]
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
}
