import teamModel from '../database/models/team';
import TeamDTO from '../dtos/TeamDTO';

export default class TeamModel {
  private model = teamModel;

  public async findAll(): Promise<TeamDTO[]> {
    const result = await this.model.findAll();
    return result;
  }

  public async findByPk(id: string): Promise<TeamDTO | null> {
    const result = await this.model.findByPk(id);
    return result;
  }
}
