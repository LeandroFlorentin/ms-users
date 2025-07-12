import { NextFunction, Response, RequestMiddlewareId } from '&/types/express';
import { APIError } from '&/shared';

export const idqueryMiddleware = (req: RequestMiddlewareId, res: Response, next: NextFunction) => {
  if (!req.query.id) throw new APIError(400, 'No se envio id en el query.');
  next();
};
