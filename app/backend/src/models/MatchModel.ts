import matchModel from '../database/models/match';
import Team from '../database/models/team';
import MatchDTO from '../dtos/MatchDTO';

export default class MatchModel {
  private model = matchModel;

  public async findAll(): Promise<MatchDTO[]> {
    const result = await this.model.findAll({
      include: [
        { model: Team, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: Team, as: 'teamAway', attributes: { exclude: ['id'] } },
      ],
    });
    return result;
  }

  // public async findByPk(id: string): Promise<TeamDTO | null> {
  //   const result = await this.model.findByPk(id);
  //   return result;
  // }
}
