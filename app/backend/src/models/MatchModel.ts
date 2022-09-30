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

  public async findAllInProgress(inProgress: string): Promise<MatchDTO[]> {
    const result = await this.model.findAll({
      include: [
        { model: Team, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: Team, as: 'teamAway', attributes: { exclude: ['id'] } },
      ],
      where: { inProgress: inProgress === 'true' },
    });
    return result;
  }

  public async create(match: MatchDTO): Promise<MatchDTO> {
    const result = await this.model.create(match);
    return result;
  }

  public async updateInProgress(id: string): Promise<void> {
    await this.model.update(
      { inProgress: 0 },
      { where: { id } },
    );
  }

  public async updateTeamGoals(
    id: string,
    homeTeamGoals: number,
    awayTeamGoals: number,
  ): Promise<void> {
    await this.model.update(
      { homeTeamGoals, awayTeamGoals },
      { where: { id } },
    );
  }

  // public async findByPk(id: string): Promise<TeamDTO | null> {
  //   const result = await this.model.findByPk(id);
  //   return result;
  // }
}
