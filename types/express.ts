import { Request, Response, NextFunction } from 'express';
import { IUserInput, IUserDB, IUserDecodedToken } from '&/application/dtos/users/users.dto';

type TokenType = {
  token?: string;
};

type UserType = {
  user?: IUserDecodedToken;
};

export type RequestWithUser<Q = any, B = any> = Request<any, any, B, Q>;

export type RequestWithUsername = RequestWithUser<{ username?: string }>;

export type RequestWithUserBody = RequestWithUser<any, IUserInput>;

export type RequestWithIdQuery = RequestWithUser<{ id: string }> & UserType;

export type RequestWhenUpdateUser = RequestWithUser<{ id: string }, IUserDB> & UserType;

export type RequestWithToken = RequestWithUser & TokenType & UserType;

export type RequestPermitsMiddleware = RequestWithUser & TokenType & UserType;

export { Request, Response, NextFunction };
