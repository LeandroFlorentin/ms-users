import { UserRepository } from '&/domain/user/user.repository';
import userSchema from '&/infrastructure/zod/schemas/user.zod';
import { IUserInput } from '../../dtos/users/users.dto';
import { APIError, hashPassword } from '&/shared';

export const createUser = async (userRepo: UserRepository, body: IUserInput) => {
  userSchema.parse(body);

  const existingUser = await userRepo.findByEmailAndUsername({ email: body.email, username: body.username });
  if (existingUser) throw new APIError(400, 'El usuario ya existe con el email o nombre de usuario proporcionado.');

  body.password = await hashPassword(body.password);

  const savedUser = await userRepo.create(body);

  return savedUser;
};
