import { Request, Response } from 'express';
import UsersService from '../services/UserService';
import httpErrors from '../helpers/errors';

class UserController {
  constructor(private service = new UsersService()) { }

  public login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const { status, token } = await this.service.login(email, password);
    if (!token) {
      const message = httpErrors(status);
      return res.status(status).json({ message });
    }
    res.status(status).json({ token });
  };

  public validateLogin = async (req: Request, res: Response) => {
    const token = req.headers.authorization;
    const { status, role } = await this.service.validateLogin(token as string);
    res.status(status).json({ role });
  };
}

export default UserController;
