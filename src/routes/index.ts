import {
  Router,
  NextFunction,
  Request,
  Response,
} from 'express';

import { createUser, login } from '../controllers/users';
import auth from '../middlewares/auth';
import { validCreateUser, validLogin } from '../middlewares/validation';

import userRouter from './users';
import cardRouter from './cards';
import NotFoundError from '../errors/not-found-err';

const router = Router();

router.post('/signin', validLogin, login);
router.post('/signup', validCreateUser, createUser);

router.use(auth);

router.use('/users', userRouter);
router.use('/cards', cardRouter);

router.use((req: Request, res: Response, next: NextFunction) => {
  next(new NotFoundError('Страницы не существует'));
});

export default router;
