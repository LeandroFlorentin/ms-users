import { getMethod } from '&/infrastructure/testing/helpers';
import { generateToken } from '&/shared/jwt';

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

describe('Test en endpoint getUsers', () => {
  it('Get users', async () => {
    const headers = { Authorization: 'Bearer ' + token };
    const instance = getMethod('get', '/users/get_users');
    const { status, body } = await instance.set(headers);
    expect(status).toBe(200);
    expect(Array.isArray(body)).toBeTruthy();
  });
});
