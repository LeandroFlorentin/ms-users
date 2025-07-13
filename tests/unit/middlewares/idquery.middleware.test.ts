import { idqueryMiddleware } from '&/interface/middlewares';
import { APIError } from '&/shared';

const res = { status: jest.fn().mockReturnThis(), json: jest.fn };
const next = jest.fn();

describe('Middleware idquery', () => {
  it('No se envia id.', () => {
    const req = { query: {} } as any;
    try {
      idqueryMiddleware(req, res as any, next);
    } catch (error) {
      expect(error).toBeInstanceOf(APIError);
      expect((error as APIError).message).toBe('No se envio id en el query.');
      expect((error as APIError).code).toBe(400);
    }
  });
});
