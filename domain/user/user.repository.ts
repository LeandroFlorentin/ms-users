import { IUserInput, IUserDB, IUserFindByEmailAndUsername } from '&/application/dtos/users/users.dto';

export interface UserRepository {
  create(user: IUserInput): Promise<IUserDB>;
  findByEmailAndUsername(body: IUserFindByEmailAndUsername): Promise<IUserDB | null>;
}
