import { Request } from '&/types/express';
import { errorMiddleware } from '&/interface/middlewares';
import { APIError } from '&/shared';
import { ZodError, z } from '&/infrastructure/validation/index';

const req = {} as Request;
const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
const next = jest.fn();

describe('Test error middleware', () => {
  it('JWT error', () => {
    const error = {
      name: 'TokenExpiredError',
      message: 'jwt expired',
    } as APIError;

    errorMiddleware(error, req, res as any, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ errors: ['jwt expired'] });
  });

  it('Zod error', () => {
    const schema = z.object({
      username: z.string().min(1, 'El campo username es obligatorio.'),
      email: z.string().email('Email con formato invalido.'),
    });

    let error: ZodError;

    try {
      schema.parse({ username: '', email: '' });
    } catch (err) {
      error = err as ZodError;
    }

    errorMiddleware(error!, req, res as any, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ errors: ['El campo username es obligatorio.', 'Email con formato invalido.'] });
  });

  it('API Error con parametros', () => {
    const error = {
      code: 401,
      message: 'Token no enviado.',
    } as APIError;

    errorMiddleware(error, req, res as any, next);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ errors: ['Token no enviado.'] });
  });
  it('API Error con parametros', () => {
    const error = {} as APIError;

    errorMiddleware(error, req, res as any, next);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ errors: ['Error interno de servidor.'] });
  });
});
