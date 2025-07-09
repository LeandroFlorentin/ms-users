import { UserAttributes } from '&/infrastructure/database/models/user.model';

export interface IUserInput {
  email: string;
  username: string;
  password: string;
}

export interface IUserDB extends UserAttributes {}

export type IUserFindByEmailAndUsername = { email?: string; username?: string };

export interface IQueryGetUser {
  username: string;
}

export interface IQueryInput {
  username?: string;
}

export type ReturnFindUserOrEmail = { username: string } | { email: string };
