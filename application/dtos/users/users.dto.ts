import { UserAttributes } from '&/infrastructure/database/models/user.model';

export interface IUserInput {
  email: string;
  username: string;
  password: string;
}

export type IFilterGetUsers = Omit<UserAttributes, 'password' | 'id' | 'role' | 'updatedAt' | 'createdAt'>;

export type IUserDB = UserAttributes;

export type IUserDecodedToken = Omit<IUserDB, 'password'>;

export type IUserFindByEmailAndUsername = { email?: string; username?: string };

export interface IQueryGetUser {
  username: string;
}

export interface IQueryInput {
  username?: string;
}

export type ReturnFindUserOrEmail = { username: string } | { email: string };
