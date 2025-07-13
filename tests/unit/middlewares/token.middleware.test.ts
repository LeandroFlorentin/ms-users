import { tokenMiddleware } from '&/interface/middlewares';
import { APIError } from '&/shared';

const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

const next = jest.fn();

describe('Testing token middleware', () => {
  it('Headers no enviado', () => {
    const req = { headers: {} } as any;
    try {
      tokenMiddleware(req, res as any, next);
    } catch (error) {
      expect(error).toBeInstanceOf(APIError);
      expect((error as APIError).code).toBe(401);
      expect((error as APIError).message).toBe('Token no enviado.');
    }
  });
  it('Token no enviado', () => {
    const req = { headers: { authorization: 'Bearer ' } } as any;
    try {
      tokenMiddleware(req, res as any, next);
    } catch (error) {
      expect(error).toBeInstanceOf(APIError);
      expect((error as APIError).code).toBe(401);
      expect((error as APIError).message).toBe('Token no enviado.');
    }
  });
  it('Formato headers invalido, no bearer', () => {
    const req = { headers: { authorization: 'asdf' } } as any;
    try {
      tokenMiddleware(req, res as any, next);
    } catch (error) {
      expect(error).toBeInstanceOf(APIError);
      expect((error as APIError).code).toBe(401);
      expect((error as APIError).message).toBe('Formato de headers invalido.');
    }
  });
  it('Formato headers invalido', () => {
    const req = { headers: { authorization: 'Bearer asdsdfsd asfdsfsdfsd' } } as any;
    try {
      tokenMiddleware(req, res as any, next);
    } catch (error) {
      expect(error).toBeInstanceOf(APIError);
      expect((error as APIError).code).toBe(401);
      expect((error as APIError).message).toBe('Formato de headers invalido.');
    }
  });
});
