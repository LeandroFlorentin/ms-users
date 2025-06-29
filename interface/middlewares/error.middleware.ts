import { Request, Response, NextFunction } from 'express';
import { ZodError, manageMessageZod } from '&/infrastructure/zod/index';
import buildLogger from '&/infrastructure/winston';

const logger = buildLogger('middlewareError');

const jwtErrorNames = ['TokenExpiredError', 'JsonWebTokenError', 'NotBeforeError'];

export const errorMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {
  logger.error(err.message);

  if (jwtErrorNames.includes(err.name)) {
    res.status(401).json({
      errors: [err.message],
    });
    return;
  }

  if (err instanceof ZodError) {
    res.status(400).json({
      errors: manageMessageZod(err),
    });
    return;
  }

  const status = err.code || err.status || 500;
  let message = err.message || 'Internal Server Error';
  res.status(status).json({
    errors: [message],
  });
  return;
};
