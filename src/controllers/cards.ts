import { NextFunction, Request, Response } from 'express';
import Card from '../models/card';
import { CustomRequest } from '../types/request';
import NotCorrectDataError from '../errors/not-correct-data';
import NotFoundError from '../errors/not-found-err';
import ForbiddenActionError from '../errors/forbidden';

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

export const delCardById = (req: CustomRequest, res: Response, next: NextFunction) => {
  Card
    .findById({ _id: req.params.cardId })
    .then(async (card) => {
      if (card === null) return next(new NotFoundError('Карточка с указанным _id не найдена'));
      if (card.owner.toString() !== req.user?._id) {
        return next(new ForbiddenActionError('Нельзя удалять карточки других пользователей'));
      }
      return card.deleteOne()
        .then((delCard) => res.status(200).send(delCard));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new NotCorrectDataError('Передан некорректный _id карточки'));
      }
      return next(err);
    });
};

export const likeCard = (req: CustomRequest, res: Response, next: NextFunction) => {
  Card
    .findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user?._id } },
      { new: true },
    )
    .then((card) => {
      if (card === null) return next(new NotFoundError('Передан несуществующий _id карточки'));
      return res.status(200).send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new NotCorrectDataError('Передан некорректный _id карточки'));
      }
      return next(err);
    });
};

export const dislikeCard = (req: CustomRequest, res: Response, next: NextFunction) => {
  Card
    .findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user?._id } },
      { new: true },
    )
    .then((card) => {
      if (card === null) return next(new NotFoundError('Передан несуществующий _id карточки'));
      return res.status(200).send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new NotCorrectDataError('Передан некорректный _id карточки'));
      }
      return next(err);
    });
};
