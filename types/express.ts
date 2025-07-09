import { Request } from 'express';
import { IUserInput, IUserDB } from '&/application/dtos/users/users.dto';

export interface RequestWithUsername extends Request {
  query: {
    username?: string;
  };
}

export interface RequestWithUserBody extends Request {
  body: IUserInput;
}

export interface RequestWhenUpdateUser extends Request, RequestTokenMiddleware {
  query: {
    id: string;
  };
  body: IUserDB;
}

export interface RequestWithToken extends Request {
  token?: string;
}

export interface RequestTokenMiddleware extends Request {
  user?: IUserDB;
}
