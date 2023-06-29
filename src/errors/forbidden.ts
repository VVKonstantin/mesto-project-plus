import { ERR_FORBIDDEN } from '../constants';

export default class ForbiddenActionError extends Error {
  public statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = ERR_FORBIDDEN;
  }
}
