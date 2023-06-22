import { NextFunction, Request, Response } from 'express';
import User from '../models/user';
import { CustomRequest } from '../types/request';
import NotFoundError from '../errors/not-found-err';
import NotCorrectDataError from '../errors/not-correct-data';

export const getUsers = (req: Request, res: Response, next: NextFunction) => {
  User
    .find({})
    .then((users) => res.status(200).send({ data: users }))
    .catch(next);
};

export const getUserById = (req: Request, res: Response, next: NextFunction) => {
  User
    .findById(req.params.userId)
    .then((user) => {
      if (user === null) return next(new NotFoundError('Пользователь с указанным _id не найден'));
      return res.status(200).send({ data: user });
    })
    .catch((err) => {
      if (err.message.includes('Cast to ObjectId failed')) {
        return next(new NotFoundError('Пользователь с указанным _id не найден'));
      }
      return next(err);
    });
};

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  const { name, about, avatar } = req.body;
  return User
    .create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new NotCorrectDataError('Переданы некорректные данные при создании пользователя'));
      }
      return next(err);
    });
};

export const updateProfile = (req: CustomRequest, res: Response, next: NextFunction) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user?._id, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      if (user === null) return next(new NotFoundError('Пользователь с указанным _id не найден'));
      return res.status(200).send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new NotCorrectDataError('Переданы некорректные данные при обновлении профиля'));
      }
      if (err.message.includes('Cast to ObjectId failed')) {
        return next(new NotFoundError('Пользователь с указанным _id не найден'));
      }
      return next(err);
    });
};

export const updateAvatar = (req: CustomRequest, res: Response, next: NextFunction) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user?._id, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      if (user === null) return next(new NotFoundError('Пользователь с указанным _id не найден'));
      return res.status(200).send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new NotCorrectDataError('Переданы некорректные данные при обновлении аватара'));
      }
      if (err.message.includes('Cast to ObjectId failed')) {
        return next(new NotFoundError('Пользователь с указанным _id не найден'));
      }
      return next(err);
    });
};
