import { getMethod } from '&/infrastructure/testing/helpers';
import { UserModel } from '&/infrastructure/database/models/user.model';

let id: number;

describe('Testing en el endpoint de crear usuario.', () => {
  it('Validación de campos username, email y password', async () => {
    try {
      const sendBody = { username: '', email: '', password: '' };
      const instance = getMethod('post', '/users/create');
      const { status, body } = await instance.send(sendBody);
      expect(status).toBe(400);
      expect(body).toMatchObject({
        errors: ['El email es obligatorio.', 'Formato de email inválido.', 'El nombre de usuario es obligatorio.', 'La contraseña debe tener al menos 8 caracteres.', 'La contraseña debe contener al menos una mayúscula, una minúscula, un número y un carácter especial.'],
      });
    } catch (error) {
      throw error;
    }
  });
  it('Usuario creado con exito.', async () => {
    const sendBody = { username: 'Leandro5622', email: 'leandro.flr@gmail.com', password: 'Afuera123$' };
    const instance = getMethod('post', '/users/create');
    const { status, body } = await instance.send(sendBody);
    id = body.id;
    expect(status).toBe(200);
    expect(body).toMatchObject({
      id: expect.any(Number),
      username: sendBody.username,
      email: sendBody.email,
      role: [expect.any(String)],
      createdAt: expect.any(String),
      updatedAt: null,
    });
  });
  it('Usuario ya existente username', async () => {
    const sendBody = { username: 'Leandro5622', email: 'leandro.flr@gmail.com.ar', password: 'Afuera123$' };
    const instance = getMethod('post', '/users/create');
    const { status, body } = await instance.send(sendBody);
    expect(status).toBe(400);
    expect(body).toMatchObject({
      errors: ['El usuario ya existe con el email o nombre de usuario proporcionado.'],
    });
  });
  it('Usuario ya existente email', async () => {
    const sendBody = { username: 'Leandro5623', email: 'leandro.flr@gmail.com', password: 'Afuera123$' };
    const instance = getMethod('post', '/users/create');
    const { status, body } = await instance.send(sendBody);
    expect(status).toBe(400);
    expect(body).toMatchObject({
      errors: ['El usuario ya existe con el email o nombre de usuario proporcionado.'],
    });
  });
});

afterAll(() => {
  UserModel.destroy({ where: { id: id } });
});
