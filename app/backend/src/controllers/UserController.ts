import { Request, Response } from 'express';
import UsersService from '../services/user/UserService';

class UserController {
  constructor(private service = new UsersService()) { }

  private errors = (error: string) => {
    switch (error) {
      case 'All fields must be filled':
        return 400;
      case 'Incorrect email or password':
        return 401;
      default:
        return 500;
    }
  };

  public login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const result = await this.service.login(email, password);
    if (result.includes('Error')) {
      const message = result.split(':')[1].trim();
      const statusError = this.errors(message);
      return res.status(statusError).json({ message });
    }
    res.status(200).json({ token: result });
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
