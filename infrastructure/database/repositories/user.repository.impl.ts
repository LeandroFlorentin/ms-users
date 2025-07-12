import { UserRepository } from '&/domain/user/user.repository';
import { IUserInput, IUserDB, IUserFindByEmailAndUsername, IFilterGetUsers } from '&/application/dtos/users/users.dto';
import Op, { setFilterForSequelize, setFilterForFindUserSequelize } from '../helpers';
import { UserModel } from '../models/user.model';

export const userRepository: UserRepository = {
  async create(user: IUserInput): Promise<IUserDB> {
    const newUser = await UserModel.create(user);
    return newUser.toJSON() as IUserDB;
  },
  async update(user: IUserDB, id: number): Promise<[affectedCount: number]> {
    const updated = await UserModel.update(user, { where: { id } });
    return updated;
  },
  async getById(id: number): Promise<IUserDB | null> {
    const user = await UserModel.findByPk(id);
    return user;
  },
  async get(filters: IFilterGetUsers): Promise<IUserDB[]> {
    const sequelizeFilter = setFilterForSequelize(filters);
    const users = await UserModel.findAll({ where: sequelizeFilter, attributes: { exclude: ['password'] } });
    return users;
  },
  async delete(id: number): Promise<number> {
    const deletedUser = await UserModel.destroy({ where: { id: id } });
    return deletedUser;
  },
  async findByEmailAndUsername(body: IUserFindByEmailAndUsername): Promise<IUserDB | null> {
    const obj = setFilterForFindUserSequelize(body);
    const user = (await UserModel.findOne({ where: { [Op.or]: obj } })) as { dataValues: IUserDB } | null;
    return user ? (user.dataValues as IUserDB) : null;
  },
};
