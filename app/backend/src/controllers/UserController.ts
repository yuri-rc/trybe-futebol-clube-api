import { Request, Response } from 'express';
import UsersService from '../services/user/UserService';

class UserController {
  constructor(private service = new UsersService()) { }

  private httpErrors = (httpError: number) => {
    switch (httpError) {
      case 400:
        return 'All fields must be filled';
      case 401:
        return 'Incorrect email or password';
      case 200:
      default:
    }
  };

  public login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const result = await this.service.login(email, password);
    if (result.status !== 200) {
      const message = this.httpErrors(result.status);
      return res.status(result.status).json({ message });
    }
    res.status(result.status).json({ token: result.token });
  };

  public validateLogin = async (req: Request, res: Response) => {
    const token = req.headers.authorization;
    if (typeof token === 'string') {
      const role = await this.service.validateLogin(token);
      res.status(200).json({ role });
    }
  };
}

export default UserController;
