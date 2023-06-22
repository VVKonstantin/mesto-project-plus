import { NextFunction, Request, Response } from 'express';
import Card from '../models/card';
import { CustomRequest } from '../types/request';
import NotCorrectDataError from '../errors/not-correct-data';
import NotFoundError from '../errors/not-found-err';

export const getCards = (req: Request, res: Response, next: NextFunction) => {
  Card
    .find({})
    .then((cards) => res.status(200).send({ data: cards }))
    .catch(next);
};

export const createCard = (req: CustomRequest, res: Response, next: NextFunction) => {
  const { name, link } = req.body;
  const owner = req.user?._id;

  Card
    .create({ name, link, owner })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new NotCorrectDataError('Переданы некорректные данные при создании карточки'));
      }
      return next(err);
    });
};

export const delCardById = (req: Request, res: Response, next: NextFunction) => {
  Card
    .findById({ _id: req.params.cardId })
    .then((card) => {
      if (card === null) return next(new NotFoundError('Карточка с указанным _id не найдена'));
      card?.deleteOne();
      return res.status(200).send(card);
    })
    .catch((err) => {
      if (err.message.includes('Cast to ObjectId failed')) {
        return next(new NotFoundError('Карточка с указанным _id не найдена'));
      }
      return next(err);
    });
};

export const likeCard = (req: CustomRequest, res: Response, next: NextFunction) => {
  Card
    .findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user?._id } },
      { new: true, runValidators: true },
    )
    .then((card) => {
      if (card === null) return next(new NotFoundError('Передан несуществующий _id карточки'));
      return res.status(200).send({ data: card });
    })
    .catch((err) => {
      if (err.message.includes('Cast to ObjectId failed')) {
        return next(new NotFoundError('Передан несуществующий _id карточки'));
      }
      if (err.name === 'ValidationError') {
        return next(new NotCorrectDataError('Переданы некорректные данные для постановки/снятии лайка'));
      }
      return next(err);
    });
};

export const dislikeCard = (req: CustomRequest, res: Response, next: NextFunction) => {
  Card
    .findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user?._id } },
      { new: true, runValidators: true },
    )
    .then((card) => {
      if (card === null) return next(new NotFoundError('Передан несуществующий _id карточки'));
      return res.status(200).send({ data: card });
    })
    .catch((err) => {
      if (err.message.includes('Cast to ObjectId failed')) {
        return next(new NotFoundError('Передан несуществующий _id карточки'));
      }
      if (err.name === 'ValidationError') {
        return next(new NotCorrectDataError('Переданы некорректные данные для постановки/снятии лайка'));
      }
      return next(err);
    });
};
