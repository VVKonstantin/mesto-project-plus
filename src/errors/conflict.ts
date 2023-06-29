import { ERR_CONFLICT } from '../constants';

export default class ConflictError extends Error {
  public statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = ERR_CONFLICT;
  }
}
