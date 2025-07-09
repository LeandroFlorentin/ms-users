import { UserRepository } from '&/domain/user/user.repository';
import { ICacheRepository } from '&/domain/cache/cache.repository';
import { IUserDB } from '&/application/dtos/users/users.dto';
import {hashPassword} from "&/shared"
import updateUserSchema from '&/infrastructure/validation/schemas/user/update.zod';

export const updateUser = async (userRepository: UserRepository, cacheRepository: ICacheRepository, body: IUserDB, id: number, user: IUserDB): Promise<void> => {
  updateUserSchema.parse(body);

  if(body.password) body.password = await hashPassword(body.password)

  await cacheRepository.delValue(user.username);
  await cacheRepository.delValue(user.email);

  await userRepository.update(body, id);

  return;
};
