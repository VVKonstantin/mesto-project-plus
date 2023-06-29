import { celebrate, Joi } from 'celebrate';

export const validLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
  }),
});

export const validCreateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(200),
    avatar: Joi.string(),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
  }),
});

export const validGetUserById = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().required(),
  }),
});

export const validUpdateProfile = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(200),
  }),
});

export const validUpdateAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string(),
  }),
});

export const validCreateCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().required(),
  }),
});

export const validDelCardById = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required(),
  }),
});

export const validLikeCard = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required(),
  }),
});

export const validDislikeCard = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required(),
  }),
});
