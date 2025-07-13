import { isAdminMiddleware } from '&/interface/middlewares';
import { APIError } from '&/shared';

const res = { status: jest.fn().mockReturnThis(), json: jest.fn };
const next = jest.fn();

describe('Testeo isadmin middleware', () => {
  it('Is admin testing', () => {
    const req = { user: { role: ['ADMIN'], username: 'Leandro' } } as any;
    try {
      isAdminMiddleware(req, res as any, next);
    } catch (error) {
      expect(error).toBeInstanceOf(APIError);
      expect((error as APIError).code).toBe(401);
      expect(error as APIError).toBe(`Usuario ${req.user.username} con permisos insuficientes.`);
    }
  });
});
