import { env } from '&/shared/env';

export const cacheCfg = {
  RD_PASSWORD: env('RD_PASSWORD') as string,
  RD_PORT: Number(env('RD_PORT')) as number,
  RD_HOST: env('RD_HOST') as string,
};
