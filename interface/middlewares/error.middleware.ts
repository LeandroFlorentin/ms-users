import { Request, Response, NextFunction } from 'express';
import { ZodError, manageMessage } from '&/infrastructure/validation';
import buildLogger from '&/infrastructure/logs';

const logger = buildLogger('middlewareError');

const isJwtError = (err: any) => ['TokenExpiredError', 'JsonWebTokenError', 'NotBeforeError'].includes(err?.name);

const isZodError = (err: any): err is ZodError => err instanceof ZodError;

export const errorMiddleware = (err: any, req: Request, res: Response, next: NextFunction): void => {
  logger.error(err.message);

  if (isJwtError(err)) {
    res.status(401).json({ errors: [err.message] });
    return;
  }

  if (isZodError(err)) {
    res.status(400).json({ errors: manageMessage(err) });
    return;
  }

  const status = err.code || err.status || 500;
  const message = err.message || 'Internal Server Error';

  res.status(status).json({ errors: [message] });
  return;
};
