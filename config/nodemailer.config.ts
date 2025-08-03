import { env } from '&/shared/env';

export const configNodemailer = {
  SERVICE: env('EMAIL_SERVICE') as string,
  USER: env('EMAIL') as string,
  PASS: env('EMAIL_PASSWORD') as string,
};
