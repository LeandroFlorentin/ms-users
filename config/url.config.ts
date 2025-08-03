import { env } from '&/shared/env';

export const urlConfig = {
  url: env('URL_BASE') as string,
  port: Number(env('PORT')) as number,
};
