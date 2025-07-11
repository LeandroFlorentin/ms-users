import { IUserInput, IUserDB, IUserFindByEmailAndUsername } from '&/application/dtos/users/users.dto';

export interface UserRepository {
  create(user: IUserInput): Promise<IUserDB>;
  update(user: IUserDB, id: number): Promise<[affectedCount: number]>;
  getById(id: number): Promise<IUserDB | null>;
  findByEmailAndUsername(body: IUserFindByEmailAndUsername): Promise<IUserDB | null>;
}
