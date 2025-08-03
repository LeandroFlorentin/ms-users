import { UserRepository } from '&/domain/user/user.repository';
import { ICacheRepository } from '&/domain/cache/cache.repository';
import { decodedToken, APIError } from '&/shared';

export const activateUser = async (userRepository: UserRepository, cacheRepository: ICacheRepository, token: string): Promise<void> => {
  if (!token) throw new APIError(400, 'Token is required for activation');
  const decoded = decodedToken(token);
  const { id, username, email } = decoded as { id: number; username: string; email: string };
  await userRepository.isActivate(id);
  await cacheRepository.delValue(username);
  await cacheRepository.delValue(email);
};
