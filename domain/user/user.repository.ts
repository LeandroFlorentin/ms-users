import { IUserInput, IUserDB, IUserFindByEmailAndUsername, IFilterGetUsers } from '&/application/dtos/users/users.dto';

export interface UserRepository {
  create(user: IUserInput): Promise<IUserDB>;
  update(user: IUserDB, id: number): Promise<[affectedCount: number]>;
  getById(id: number): Promise<IUserDB | null>;
  get(filters: IFilterGetUsers): Promise<IUserDB[]>;
  delete(id: number): Promise<number>;
  findByEmailAndUsername(body: IUserFindByEmailAndUsername): Promise<IUserDB | null>;
}
