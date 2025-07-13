import { APIError } from '&/shared';

describe('Testing API Error', () => {
  it('Verificando error con parametros', () => {
    const error = new APIError(400, 'Bad request');
    expect(error).toBeInstanceOf(APIError);
    expect(error.code).toBe(400);
    expect(error.message).toBe('Bad request');
  });
  it('Verificando error sin parametros', () => {
    const error = new APIError();
    expect(error).toBeInstanceOf(APIError);
    expect(error.code).toBe(500);
    expect(error.message).toBe('Error interno de servidor.');
  });
});
