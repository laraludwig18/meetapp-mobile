import request from 'supertest';

import app from '../../src/app';
import factory from '../factories/userFactories';
import truncate from '../util/truncate';

const user = {
  name: 'Lara Ludwig',
  email: 'laraludwig18@gmail.com',
  password: '123456',
};

async function saveUser(newUser) {
  return request(app)
    .post('/users')
    .send(newUser);
}

async function login(session) {
  return request(app)
    .post('/sessions')
    .send(session);
}

async function updateUser(token, newUser) {
  return request(app)
    .put('/users')
    .set('Authorization', `Bearer ${token}`)
    .send(newUser);
}

describe('User', () => {
  beforeEach(async () => {
    await truncate();

    await saveUser(user);
  });

  it('should be able to update user name', async () => {
    const { email, password } = user;

    const session = await login({ email, password });

    const response = await updateUser(session.body.token, {
      name: 'lara',
      email: user.email,
    });

    expect(response.body.name).toBe('lara');
  });

  it('should be able to update password', async () => {
    const { name, email, password } = user;

    const newPassword = '121212';

    const session = await login({ email, password });

    await updateUser(session.body.token, {
      name,
      email,
      oldPassword: password,
      password: newPassword,
      confirmPassword: newPassword,
    });

    const response = await login({ email, password: newPassword });

    expect(response.body).toHaveProperty('token');
  });

  it('should not be able to update with duplicated email', async () => {
    const { name, email, password } = user;
    const user2 = await factory.attrs('User');

    await saveUser(user2);

    const session = await login({ email, password });

    const response = await updateUser(session.body.token, {
      name,
      email: user2.email,
    });

    expect(response.body.error).toBe('Usuário já existente.');
  });

  it('should return passwords does not match', async () => {
    const { name, email, password } = user;

    const session = await login({ email, password });

    const response = await updateUser(session.body.token, {
      name,
      email,
      oldPassword: '444444',
      password: '454545',
      confirmPassword: '454545',
    });

    expect(response.body.error).toBe('Senhas não coincidem.');
  });

  it('should return invalid email', async () => {
    const { name, email, password } = user;

    const session = await login({ email, password });

    const response = await updateUser(session.body.token, {
      name,
      email: 'teste.com',
    });

    expect(response.body.error).toBe('Email inválido.');
  });

  afterAll(async () => {
    await truncate();
  });
});
