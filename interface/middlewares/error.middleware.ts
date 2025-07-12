import { Request, Response, NextFunction } from '&/types/express';
import { ZodError, manageMessage } from '&/infrastructure/validation';
import { Error } from '&/types/express';
import buildLogger from '&/infrastructure/logs';

const logger = buildLogger('middlewareError');

const isJwtError = (err: Error) => ['TokenExpiredError', 'JsonWebTokenError', 'NotBeforeError'].includes(err?.name);

const isZodError = (err: Error): err is ZodError => err instanceof ZodError;

export const errorMiddleware = (err: Error, _: Request, res: Response, __: NextFunction): void => {
  logger.error(err.message);

  if (isJwtError(err)) {
    res.status(401).json({ errors: [err.message] });
    return;
  }

  if (isZodError(err)) {
    res.status(400).json({ errors: manageMessage(err) });
    return;
  }

  const status = err.code || 500;
  const message = err.message || 'Internal Server Error';

  res.status(status).json({ errors: [message] });
  return;
};
