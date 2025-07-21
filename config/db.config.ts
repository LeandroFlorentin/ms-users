import { env } from '&/shared/env';
import { Dialect } from 'sequelize';

export const db = {
  DB_USER: env('DB_USER') as string,
  DB_PASSWORD: env('DB_PASSWORD') as string,
  DB_HOST: env('DB_HOST') as string,
  DB_DIALECT: env('DB_DIALECT') as Dialect,
  DB_NAME: env('DB_NAME') as string,
  DB_PORT: Number(env('DB_PORT')) as number,
};
