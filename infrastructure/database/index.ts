import { Sequelize } from 'sequelize';
import { db } from '&/config';

export const sequelize = new Sequelize(db.DB_NAME, db.DB_USER, db.DB_PASSWORD, {
  host: db.DB_HOST,
  port: db.DB_PORT,
  dialect: db.DB_DIALECT,
  logging: false,
});
