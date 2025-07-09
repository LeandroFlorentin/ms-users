import { IQueryInput, ReturnFindUserOrEmail } from '&/application/dtos/users/users.dto';
import { isEmail } from '&/infrastructure/validation';

export const createBodyGetUserOrEmail = (query: IQueryInput): ReturnFindUserOrEmail => {
  const [key, value] = Object.entries(query)[0];
  const isEmailValue = isEmail(value);
  return isEmailValue ? { email: value } : { username: value };
};
