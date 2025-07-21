import { env } from '&/shared/env';

export const jwtConfig = {
  JWT_SECRET: env('JWT_SECRET') as string,
};
