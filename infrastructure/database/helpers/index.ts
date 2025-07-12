import { Op, WhereOptions } from 'sequelize';
import { UserAttributes } from '../models/user.model';
import { IUserDB } from '&/application/dtos/users/users.dto';

export function setFilterForSequelize(body: Partial<Record<keyof IUserDB, string>>): WhereOptions<UserAttributes> | undefined {
  return Object.entries(body).reduce<Record<string, object>>((acc, [key, value]) => {
    acc[key] = { [Op.iLike]: `%${value}%` };
    return acc;
  }, {});
}

export function setFilterForFindUserSequelize(body: Partial<Record<keyof IUserDB, string>>): WhereOptions<UserAttributes> | undefined {
  return Object.entries(body).reduce<Record<string, object>>((acc, [key, value]) => {
    acc[key] = { [Op.iLike]: value };
    return acc;
  }, {});
}

export default Op;
