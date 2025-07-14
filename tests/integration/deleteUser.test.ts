import { getMethod } from '&/infrastructure/testing/helpers';
import { generateToken } from '&/shared';

let token: string;

beforeAll(() => {
  const data = {
    id: 1,
    username: 'user_prueba',
    email: 'prueba@gmail.com',
    role: ['ADMIN'],
    createdAt: '2025-06-26T13:20:28.020Z',
    updatedAt: null,
  };
  token = generateToken(data);
});

describe('Testing en endpoint delete user', () => {
  it('Usuario eliminado con éxito', async () => {
    const headers = { Authorization: 'Bearer ' + token };
    const instance = getMethod('delete', '/users/delete');
    const { status, body } = await instance.set(headers).query({ id: 1 });
    console.log('BEEEDYY', body);
    expect(status).toBe(200);
    expect(body).toMatchObject({ message: 'Usuario user_prueba eliminado con éxito.' });
  });
});
