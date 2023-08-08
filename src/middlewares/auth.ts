import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { SECRET_KEY } from '../constants';
import WrongAuthError from '../errors/not-correct-auth';

interface SessionRequest extends Request {
  user?: string | JwtPayload;
}

export default (req: SessionRequest, res: Response, next: NextFunction) => {
  const token = req.cookies.jwt;
  const { JWT_SECRET = SECRET_KEY } = process.env;
  if (!token) return next(new WrongAuthError('Необходима авторизация'));
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return next(new WrongAuthError('Необходима авторизация'));
  }

  req.user = payload;

  return next();
};
