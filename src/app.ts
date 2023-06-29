import express from 'express';
import mongoose from 'mongoose';
import { errors } from 'celebrate';
import router from './routes';
import { createUser, login } from './controllers/users';
import auth from './middlewares/auth';
import errorCatcher from './middlewares/error-catcher';
import { validCreateUser, validLogin } from './middlewares/validation';
import { requestLogger, errorLogger } from './middlewares/logger';
import { limiter } from './constants';

const { PORT = 3000 } = process.env;

const app = express();

app.use(limiter);

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(requestLogger);

app.post('/signin', validLogin, login);
app.post('/signup', validCreateUser, createUser);

app.use(auth);

app.use('/', router);

app.use(errorLogger);

app.use(errors());
app.use(errorCatcher);

app.listen(PORT);
