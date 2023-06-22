import { Request } from 'express';

type TCustomRequest = {
  user?: {
    _id: string,
  }
}

export type CustomRequest = Request & TCustomRequest;
