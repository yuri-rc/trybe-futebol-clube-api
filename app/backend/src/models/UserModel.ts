import userModel from '../database/models/user';
import LoginDTO from '../dtos/LoginDTO';

export default class UserModel {
  public model = userModel;

  public async findOne(email: string): Promise<LoginDTO> {
    const result = await this.model.findOne({ where: { email } });
    return result as LoginDTO;
  }
}
