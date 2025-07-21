import { env } from '&/shared/env';

export const mainConfig = {
  PORT: Number(env('PORT')) as number,
};
