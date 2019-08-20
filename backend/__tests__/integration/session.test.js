import request from 'supertest';

import app from '../../src/app';
import truncate from '../util/truncate';

const user = {
  name: 'lara',
  email: 'laraludwig18@gmail.com',
  password: '123456',
};

async function login(session) {
  return request(app)
    .post('/sessions')
    .send(session);
}

describe('Session', () => {
  beforeAll(async () => {
    await truncate();

    await request(app)
      .post('/users')
      .send(user);
  });

  it('should return user information', async () => {
    const { email, password } = user;

    const response = await login({ email, password });

    expect(response.body).toHaveProperty('user');
  });

  it('should return token', async () => {
    const { email, password } = user;

    const response = await login({ email, password });

    expect(response.body).toHaveProperty('token');
  });

  it('should return user not found', async () => {
    const response = await login({
      email: 'teste@gmail.com',
      password: '123456',
    });

    expect(response.body.error).toBe('Usuário não encontrado.');
  });

  it('should return invalid login', async () => {
    const { email } = user;

    const response = await login({ email, password: '123457' });

    expect(response.body.error).toBe('Login inválido.');
  });

  it('should return invalid email', async () => {
    const response = await login({ email: 'teste.com', password: '123456' });

    expect(response.body.error).toBe('Email inválido.');
  });

  afterAll(async () => {
    await truncate();
  });
});
