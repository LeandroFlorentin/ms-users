import cache from '&/infrastructure/cache';
import { IUserDB } from '&/application/dtos/users/users.dto';

export const cacheRepository = {
  setValue: async (key: string, value: string): Promise<string | null> => await cache.set(key.toLowerCase(), value),
  getValue: async (key: string): Promise<IUserDB | null> => {
    const value = await cache.get(key.toLowerCase());
    return value ? (JSON.parse(value) as IUserDB) : null;
  },
  delValue: async (key: string): Promise<number> => await cache.del(key.toLowerCase()),
};
