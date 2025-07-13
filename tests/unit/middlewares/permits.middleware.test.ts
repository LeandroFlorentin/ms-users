import { permitsMiddleware } from '&/interface/middlewares';
import { APIError } from '&/shared';

const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

const next = jest.fn();

describe('Testing permits', () => {
  it('Testeo middlewares permisos.', () => {
    const req = { user: { id: 1, role: ['USER'] }, query: { id: 3 } } as any;
    try {
      permitsMiddleware(req, res as any, next);
    } catch (error) {
      expect(error).toBeInstanceOf(APIError);
      expect((error as APIError).code).toBe(403);
      expect((error as APIError).message).toBe(`Usuario ${req.user.username} con permisos insuficientes.`);
    }
  });
});
