import { compare } from 'bcryptjs';
import UserModel from '../../models/UserModel';
import jwt from '../../helpers/jwt';

export default class UserService {
  public model: UserModel;

  constructor() {
    this.model = new UserModel();
  }

  public async login(_email: string, _password: string): Promise<string> {
    if (_email === '' || _password === '') {
      return 'Error: All fields must be filled';
    }
    const user = await this.model.findOne(_email);
    if (!user) {
      return 'Error: Incorrect email or password';
    }
    const validatePassword = await compare(_password, user.password);
    if (!validatePassword) {
      return 'Error: Incorrect email or password';
    }
    const token = jwt.create({ email: user.email });
    return token;
  }

  public async validateLogin(token: string): Promise<string | undefined> {
    const { email } = jwt.validate(token);
    const { role } = await this.model.findOne(email);
    return role;
  }
}
