import { ERR_INCORRECT_DATA } from '../constants';

export default class NotCorrectDataError extends Error {
  public statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = ERR_INCORRECT_DATA;
  }
}
