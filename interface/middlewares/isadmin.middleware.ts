import { Response, NextFunction, RequestGetUsers } from '&/types/express';
import { APIError } from '&/shared';

export const isAdminMiddleware = (req: RequestGetUsers, res: Response, next: NextFunction) => {
  if (!req.user?.role.includes('ADMIN')) throw new APIError(401, `Usuario ${req.user?.username} con permisos insuficientes.`);
  next();
};
