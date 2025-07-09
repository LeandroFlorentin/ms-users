import { IUserDB } from '&/application/dtos/users/users.dto';

export interface ICacheRepository {
  setValue: (key: string, value: string) => Promise<string | null>;
  getValue: (key: string) => Promise<IUserDB | null>;
  delValue: (key: string) => Promise<number>;
}
