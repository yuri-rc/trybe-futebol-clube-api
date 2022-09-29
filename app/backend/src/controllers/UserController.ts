import { Request, Response } from 'express';
import UsersService from '../services/UserService';

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
    const { status, token } = await this.service.login(email, password);
    if (!token) {
      const message = this.httpErrors(status);
      return res.status(status).json({ message });
    }
    res.status(status).json({ token });
  };

  public validateLogin = async (req: Request, res: Response) => {
    const token = req.headers.authorization;
    if (typeof token === 'string') {
      const { status, role } = await this.service.validateLogin(token);
      res.status(status).json({ role });
    }
  };
}

export default UserController;
