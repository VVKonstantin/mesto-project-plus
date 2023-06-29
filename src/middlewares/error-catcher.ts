import { Request, Response, NextFunction } from 'express';
import { Error } from '../types/error';
import { ERR_SERVER_INTERNAL } from '../constants';

export default (err: Error, req: Request, res: Response, next: NextFunction) => {
  const { statusCode = ERR_SERVER_INTERNAL, message } = err;
  res
    .status(statusCode)
    .send({
      message: statusCode === ERR_SERVER_INTERNAL ? 'На сервере произошла ошибка' : message,
    });
  next();
};
