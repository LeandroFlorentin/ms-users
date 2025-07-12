import { RequestPermitsMiddleware, Response, NextFunction } from '&/types/express';
import { APIError } from '&/shared';

export const permitsMiddleware = (req: RequestPermitsMiddleware, res: Response, next: NextFunction): void => {
  const user = req.user!;
  const isAdmin = user.role.some((permit) => permit.toLowerCase() === 'admin');
  if (isAdmin) return next();
  if (Number(user.id) === Number(req.query.id)) return next();
  throw new APIError(403, `Usuario ${user.username} con permisos insuficientes.`);
};
