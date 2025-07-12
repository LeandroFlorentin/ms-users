import { Request, Response, NextFunction, Application } from 'express';
import { IUserInput, IUserDB, IUserDecodedToken } from '&/application/dtos/users/users.dto';
import { ZodError } from 'zod';
import { APIError } from '&/shared';

export type Error = ZodError | APIError;

type TokenType = {
  token?: string;
};

type UserType = {
  user?: IUserDecodedToken;
};

export type RequestGeneral<Q = unknown, B = unknown> = Request<unknown, unknown, B, Q>;

export type RequestWithUsername = RequestGeneral<{ username?: string }>;

export type RequestWithUserBody = RequestGeneral<unknown, IUserInput>;

export type RequestWithIdQuery = RequestGeneral<{ id: string }> & UserType;

export type RequestGetUsers = RequestGeneral<{ username: string; email: string }, unknown> & TokenType & UserType;

export type RequestWhenUpdateUser = RequestGeneral<{ id: string }, IUserDB> & UserType;

export type RequestWithToken = RequestGeneral & TokenType & UserType;

export type RequestMiddlewareId = RequestGeneral<{ id: string }> & TokenType;

export type RequestPermitsMiddleware = RequestGeneral<{ id: string }> & TokenType & UserType;

export { Request, Response, NextFunction, Application };
