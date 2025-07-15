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
    const sendBody = { username: 'Leandro5624', email: 'leandro.flr@gmail.com.ar', password: 'Afuera123$' };
    const instanceCreate = getMethod('post', '/users/create');
    const { body: bodyC } = await instanceCreate.send(sendBody);

    console.log('BEDYC', JSON.stringify(bodyC));

    let new_token = generateToken(bodyC);

    const headers = { Authorization: 'Bearer ' + new_token };
    const instance = getMethod('delete', '/users/delete');
    const { status, body } = await instance.set(headers).query({ id: bodyC.id });
    expect(status).toBe(200);
    expect(body).toMatchObject({ message: `Usuario ${bodyC.username} eliminado con éxito.` });
  });
});
