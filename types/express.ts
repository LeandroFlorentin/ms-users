import { Request, Response, NextFunction } from 'express';
import { IUserInput, IUserDB, IUserDecodedToken } from '&/application/dtos/users/users.dto';

type TokenType = {
  token?: string;
};

type UserType = {
  user?: IUserDecodedToken;
};

export type RequestGeneral<Q = any, B = any> = Request<any, any, B, Q>;

export type RequestWithUsername = RequestGeneral<{ username?: string }>;

export type RequestWithUserBody = RequestGeneral<any, IUserInput>;

export type RequestWithIdQuery = RequestGeneral<{ id: string }> & UserType;

export type RequestWhenUpdateUser = RequestGeneral<{ id: string }, IUserDB> & UserType;

export type RequestWithToken = RequestGeneral & TokenType & UserType;

export type RequestMiddlewareId = RequestGeneral & TokenType;

export type RequestPermitsMiddleware = RequestGeneral & TokenType & UserType;

export { Request, Response, NextFunction };
