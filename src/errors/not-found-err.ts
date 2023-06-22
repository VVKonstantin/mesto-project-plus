import { ERR_NOT_FOUND } from '../constants';

export default class NotFoundError extends Error {
  public statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = ERR_NOT_FOUND;
  }
}
