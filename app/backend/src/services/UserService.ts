import { compare } from 'bcryptjs';
import UserModel from '../models/UserModel';
import jwt from '../helpers/jwt';

type Response = {
  status: number,
  token?: string,
  role?: string,
};

export default class UserService {
  public model: UserModel;

  constructor() {
    this.model = new UserModel();
  }

  public async login(_email: string, _password: string): Promise<Response> {
    if (_email === '' || _password === '') {
      return { status: 400 };
    }
    const user = await this.model.findOne(_email);
    if (!user) {
      return { status: 401 };
    }
    const validatePassword = await compare(_password, user.password);
    if (!validatePassword) {
      return { status: 401 };
    }
    const token = jwt.create({ email: user.email });
    return { status: 200, token };
  }

  public async validateLogin(token: string): Promise<Response> {
    const { email } = jwt.validate(token);
    const { role } = await this.model.findOne(email);
    return { status: 200, role };
  }
}
