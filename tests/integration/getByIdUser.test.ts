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

describe('Testing getUserById', () => {
  it('Success get user by id', async () => {
    const sendBody = { username: 'Leandro5625', email: 'leandro5.flr@gmail.com.ar', password: 'Afuera123$' };
    const instanceCreate = getMethod('post', '/users/create');
    const { body: bodyC } = await instanceCreate.send(sendBody);

    console.log(console.log('BEEEDYC', bodyC));

    let new_token = generateToken(bodyC);

    const headers = { Authorization: 'Bearer ' + new_token };
    const instance = getMethod('get', '/users/get_user_by_id');
    const { status, body } = await instance.set(headers).query({ id: bodyC.id });
    console.log('BEEEDY', JSON.stringify(body));
    expect(status).toBe(200);
    expect(body).toMatchObject({
      role: [expect.any(String)],
      createdAt: expect.any(String),
      updatedAt: null,
      id: expect.any(Number),
      email: expect.any(String),
      username: expect.any(String),
    });
  });
});
