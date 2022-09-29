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

  public async findAll(): Promise<ResponseFindAll> {
    const matches = await this.model.findAll();
    return { status: 200, matches };
  }
}
