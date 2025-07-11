import { NextFunction, Response } from '&/types/express';
import { APIError, decodedToken } from '&/shared';
import buildLogger from '&/infrastructure/logs/index';
import { RequestWithToken } from '&/types/express';

const logger = buildLogger('middlewareToken');

export const tokenMiddleware = (req: RequestWithToken, res: Response, next: NextFunction) => {
  const headers = req.headers.authorization;
  if (!headers) manageError('Token no enviado.', 401);
  const parts = headers.split(' ');
  if (parts[0] !== 'Bearer' || parts.length !== 2) manageError('Formato de headers invalido.', 401);
  const token = parts[1];
  if (!token) manageError('Token no enviado.', 401);
  const decoded = decodedToken(token);
  req.user = decoded;
  next();
};

function manageError(message: string, status: number): never {
  logger.error(message);
  throw new APIError(status, message);
}
