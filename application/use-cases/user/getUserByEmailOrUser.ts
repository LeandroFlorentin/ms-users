import { UserRepository } from '&/domain/user/user.repository';
import { IQueryInput } from '../../dtos/users/users.dto';
import { createBodyGetUserOrEmail } from '&/application/helpers';
import { APIError } from '&/shared';
export const getUserByEmailOrUser = async (userRepository: UserRepository, query: IQueryInput) => {
  const body = createBodyGetUserOrEmail(query);
  const user = await userRepository.findByEmailAndUsername(body);
  if (!user) throw new APIError(404, `Usuario ${query.username} no encontrado.`);
  return user;
};
