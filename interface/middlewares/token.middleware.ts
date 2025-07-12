import { NextFunction, Response } from '&/types/express';
import { APIError, decodedToken } from '&/shared';
import { RequestWithToken } from '&/types/express';

export const tokenMiddleware = (req: RequestWithToken, res: Response, next: NextFunction) => {
  const headers = req.headers.authorization;
  if (!headers) manageError('Token no enviado.');
  const parts = headers.split(' ');
  if (parts[0] !== 'Bearer' || parts.length !== 2) manageError('Formato de headers invalido.');
  const token = parts[1];
  if (!token) manageError('Token no enviado.');
  const decoded = decodedToken(token);
  req.user = decoded;
  next();
};

function manageError(message: string): never {
  throw new APIError(401, message);
}
