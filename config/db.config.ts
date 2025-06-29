import { Dialect } from 'sequelize';

export const db = {
  DB_USER: process.env.DB_USER as string,
  DB_PASSWORD: process.env.DB_PASSWORD as string,
  DB_HOST: process.env.DB_HOST as string,
  DB_DIALECT: process.env.DB_DIALECT as Dialect,
  DB_NAME: process.env.DB_NAME as string,
  DB_PORT: Number(process.env.DB_PORT) as number,
};
