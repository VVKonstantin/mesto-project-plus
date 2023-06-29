import { ERR_AUTH } from '../constants';

export default class WrongAuthError extends Error {
  public statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = ERR_AUTH;
  }
}
