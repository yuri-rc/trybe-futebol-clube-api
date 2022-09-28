import * as jwt from 'jsonwebtoken';
import jwtDTO from '../dtos/jwtDTO';

const JWT_SECRET = process.env.JWT_SECRET || 'jwt_secret';

const create = (payload: jwtDTO): string => {
  const token = jwt.sign(payload, JWT_SECRET);
  return token;
};

const validate = (token: string): jwtDTO => {
  const decoded = jwt.verify(token, JWT_SECRET);
  return decoded as jwtDTO;
};

export default { create, validate };
