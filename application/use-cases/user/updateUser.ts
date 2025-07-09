import { UserRepository } from '&/domain/user/user.repository';
import { ICacheRepository } from '&/domain/cache/cache.repository';
import { IUserDB } from '&/application/dtos/users/users.dto';
import updateUserSchema from '&/infrastructure/validation/schemas/user/update.zod';

export const updateUser = async (userRepository: UserRepository, cacheRepository: ICacheRepository, body: IUserDB, id: number, user: IUserDB): Promise<void> => {
  updateUserSchema.parse(body);

  await cacheRepository.delValue(user.username);
  await cacheRepository.delValue(user.email);

  await userRepository.update(body, id);

  return;
};
