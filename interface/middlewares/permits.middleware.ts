import { RequestPermitsMiddleware, Response, NextFunction } from '&/types/express';
import { APIError } from '&/shared';
import buildLogger from '&/infrastructure/logs';

const logger = buildLogger('permitsMiddleware');

export const permitsMiddleware = (req: RequestPermitsMiddleware, res: Response, next: NextFunction): void => {
  const user = req.user!;
  const isAdmin = user.role.some((permit) => permit.toLowerCase() === 'admin');
  if (isAdmin) return next();
  if (Number(user.id) === Number(req.query.id)) return next();
  manageError(`Usuario ${user.username} con permisos insuficientes.`, 403);
};

function manageError(message: string, status: number) {
  logger.error(message);
  throw new APIError(status, message);
}
