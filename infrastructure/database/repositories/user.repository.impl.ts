import { UserRepository } from '&/domain/user/user.repository';
import { IUserInput, IUserDB, IUserFindByEmailAndUsername } from '&/application/dtos/users/users.dto';
import { UserModel } from '../models/user.model';
import { Op } from 'sequelize';

export const userRepository: UserRepository = {
  async create(user: IUserInput): Promise<IUserDB> {
    const newUser = await UserModel.create(user);
    return newUser.toJSON() as IUserDB;
  },
  async findByEmailAndUsername(body: IUserFindByEmailAndUsername): Promise<IUserDB | null> {
    const obj = Object.entries(body).reduce<Record<string, any>>((acc, [key, value]) => {
      acc[key] = { [Op.like]: value };
      return acc;
    }, {});
    const user = (await UserModel.findOne({ where: { [Op.or]: obj } })) as { dataValues: IUserDB } | null;
    return user ? (user.dataValues as IUserDB) : null;
  },
};
