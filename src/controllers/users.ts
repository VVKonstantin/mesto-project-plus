import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user';
import { CustomRequest } from '../types/request';
import NotFoundError from '../errors/not-found-err';
import NotCorrectDataError from '../errors/not-correct-data';
import ConflictError from '../errors/conflict';
import { SECRET_KEY } from '../constants';

// eslint-disable-next-line no-unused-vars
export const login = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => res.send({ token: jwt.sign({ _id: user._id }, SECRET_KEY, { expiresIn: '7d' }) }))
    .catch(next);
};

export const getUsers = (req: Request, res: Response, next: NextFunction) => {
  User
    .find({})
    .then((users) => res.status(200).send({ data: users }))
    .catch(next);
};

export const getCurrentUser = (req: CustomRequest, res: Response, next: NextFunction) => {
  User
    .findById(req.user?._id)
    .then((user) => {
      if (user === null) return next(new NotFoundError('Пользователь с указанным _id не найден'));
      return res.status(200).send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new NotCorrectDataError('Некорректный _id пользователя'));
      }
      return next(err);
    });
};

export const getUserById = (req: Request, res: Response, next: NextFunction) => {
  User
    .findById(req.params.userId)
    .then((user) => {
      if (user === null) return next(new NotFoundError('Пользователь с указанным _id не найден'));
      return res.status(200).send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new NotCorrectDataError('Некорректный _id пользователя'));
      }
      return next(err);
    });
};

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  return bcrypt.hash(password, 10)
    .then((hash) => User
      .create({
        name, about, avatar, email, password: hash,
      }))
    .then((user) => res.status(200).send({
      data: {
        name: user.name,
        about: user.about,
        avatar: user.avatar,
        email: user.email,
        _id: user._id,
      },
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new NotCorrectDataError('Переданы некорректные данные при создании пользователя'));
      }
      if (err.code === 11000) return next(new ConflictError('Пользователь с таким email уже зарегистрирован'));
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
      if (err.name === 'CastError') {
        return next(new NotCorrectDataError('Некорректный _id пользователя'));
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
        const mess = `${Object.values(err.errors).map((error: any) => error.message).join(', ')}`;
        return next(new NotCorrectDataError(mess));
      }
      if (err.name === 'CastError') {
        return next(new NotCorrectDataError('Некорректный _id пользователя'));
      }
      return next(err);
    });
};
