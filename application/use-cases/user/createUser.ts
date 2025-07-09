import { UserRepository } from '&/domain/user/user.repository';
import userSchema from '&/infrastructure/validation/schemas/user/create.zod';
import { IUserInput } from '../../dtos/users/users.dto';
import { APIError, hashPassword } from '&/shared';
import { ICacheRepository } from '&/domain/cache/cache.repository';

export const createUser = async (userRepo: UserRepository, cacheRepository: ICacheRepository, body: IUserInput) => {
  userSchema.parse(body);

  const existingUser = await userRepo.findByEmailAndUsername({ email: body.email, username: body.username });
  if (existingUser) throw new APIError(400, 'El usuario ya existe con el email o nombre de usuario proporcionado.');

  body.password = await hashPassword(body.password);

  const savedUser = await userRepo.create(body);

  await cacheRepository.setValue(savedUser.username, JSON.stringify(savedUser));
  await cacheRepository.setValue(savedUser.email, JSON.stringify(savedUser));

  return savedUser;
};
