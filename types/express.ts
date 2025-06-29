import { Request } from 'express';

export interface RequestWithUsername extends Request {
  query: {
    username?: string;
  };
}
