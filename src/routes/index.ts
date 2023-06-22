import {
  Router,
  NextFunction,
  Request,
  Response,
} from 'express';

import userRouter from './users';
import cardRouter from './cards';
import NotFoundError from '../errors/not-found-err';

const router = Router();

router.use('/users', userRouter);
router.use('/cards', cardRouter);

router.use((req: Request, res: Response, next: NextFunction) => {
  next(new NotFoundError('Страницы не существует'));
});

export default router;
