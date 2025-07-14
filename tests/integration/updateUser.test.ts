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

describe('Test update user endpoint.', () => {
  it('Update user Success', async () => {
    const headers = { Authorization: 'Bearer ' + token };
    const instance = getMethod('patch', '/users/update');
    const sendBody = { username: 'Leandro5622' };
    const { status, body } = await instance.set(headers).query({ id: 1 }).send(sendBody);
    expect(status).toBe(200);
    expect(body).toMatchObject({ message: 'Usuario actualizado con exito' });
  });
  it('Update user Error', async () => {
    const headers = { Authorization: 'Bearer ' + token };
    const instance = getMethod('patch', '/users/update');
    const sendBody = { username: '', password: '', email: '' };
    const { status, body } = await instance.set(headers).query({ id: 1 }).send(sendBody);
    expect(status).toBe(400);
    expect(body).toMatchObject({ errors: ['El nombre de usuario es obligatorio.', 'El email es obligatorio.', 'Formato de email inválido.', 'La contraseña debe tener al menos 8 caracteres.', 'La contraseña debe contener al menos una mayúscula, una minúscula, un número y un carácter especial.'] });
  });
});
