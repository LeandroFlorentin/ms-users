import { UserRepository } from '&/domain/user/user.repository';
import { IFilterGetUsers } from '&/application/dtos/users/users.dto';

export const getUsers = async (userRepository: UserRepository, filters: IFilterGetUsers) => {
  const users = await userRepository.get(filters);
  return users;
};
