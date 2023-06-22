import express, { NextFunction, Response } from 'express';
import mongoose from 'mongoose';
import { CustomRequest } from './types/request';
import router from './routes';
import { Error } from './types/error';
import { ERR_SERVER_INTERNAL } from './constants';

const { PORT = 3000 } = process.env;

const app = express();

// connect to db
mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

// body-parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// temp solution for authorization
app.use((req: CustomRequest, res: Response, next: NextFunction) => {
  req.user = {
    _id: '64919905f0e54b93e8d21cd7',
  };
  next();
});

// route
app.use('/', router);

// common errors processing
app.use((err: Error, req: CustomRequest, res: Response, next: NextFunction) => {
  const { statusCode = ERR_SERVER_INTERNAL, message } = err;
  res
    .status(statusCode)
    .send({
      message: statusCode === ERR_SERVER_INTERNAL ? 'На сервере произошла ошибка' : message,
    });
  next();
});

app.listen(PORT);
