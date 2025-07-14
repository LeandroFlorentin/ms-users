import { Op, WhereOptions } from 'sequelize';
import { UserAttributes } from '../models/user.model';
import { IUserDB } from '&/application/dtos/users/users.dto';
import { UserModel } from '../models/user.model';

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

export async function createTestUser(): Promise<void> {
  const body = {
    username: 'user_prueba',
    password: 'password123$',
    email: 'prueba@gmail.com',
    role: ['ADMIN'],
  };
  let isExistUser = await UserModel.findOne({ where: { username: body.username } });
  if (!isExistUser) await UserModel.create(body);
}

export default Op;
