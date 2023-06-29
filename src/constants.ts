import { rateLimit } from 'express-rate-limit';

export const ERR_INCORRECT_DATA = 400;
export const ERR_AUTH = 401;
export const ERR_FORBIDDEN = 403;
export const ERR_NOT_FOUND = 404;
export const ERR_CONFLICT = 409;
export const ERR_SERVER_INTERNAL = 500;

export const SECRET_KEY = 'sup_strong_key';

export const urlRegExp = /^https?:\/\/(?:www\.|(?!www))[-a-zA-Z0-9]{1,256}\.[a-zA-Z0-9]{2,6}[-a-zA-Z0-9()@:%_+.~#?&/=]*/;

export const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});
