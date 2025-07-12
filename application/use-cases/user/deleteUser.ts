import { UserRepository } from '&/domain/user/user.repository';
import { ICacheRepository } from '&/domain/cache/cache.repository';
import { IUserDecodedToken } from '&/application/dtos/users/users.dto';

export const deleteUser = async (userRepository: UserRepository, cacheRepository: ICacheRepository, id: number, user: IUserDecodedToken): Promise<void> => {
  await userRepository.delete(id);
  await cacheRepository.delValue(user.username);
  await cacheRepository.delValue(user.email);
  return;
};
