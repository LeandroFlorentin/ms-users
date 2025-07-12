import { UserRepository } from '&/domain/user/user.repository';
import { ICacheRepository } from '&/domain/cache/cache.repository';
import { IUserDecodedToken } from '&/application/dtos/users/users.dto';
export const getByIdUser = async (userRepository: UserRepository, cacheRepository: ICacheRepository, id: number, user: IUserDecodedToken): Promise<IUserDecodedToken | null> => {
  let userReturned = null;
  const cachedUser = await cacheRepository.getValue(user.username);
  if (cachedUser) userReturned = cachedUser;
  else {
    const userDb = await userRepository.getById(id);
    if (userDb) userReturned = userDb;
  }
  if (userReturned) {
    await cacheRepository.setValue(userReturned.username, JSON.stringify(userReturned));
    await cacheRepository.setValue(userReturned.email, JSON.stringify(userReturned));
    const { password: _, ...restUser } = userReturned;
    return restUser;
  }
  return userReturned;
};
