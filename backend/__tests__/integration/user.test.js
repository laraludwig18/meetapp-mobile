import request from 'supertest';
import bcrypt from 'bcryptjs';

import app from '../../src/app';
import factory from '../factories/userFactories';
import truncate from '../util/truncate';

async function saveUser(user) {
  return request(app)
    .post('/users')
    .send(user);
}

describe('User', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should encrpt user password when new user created', async () => {
    const user = await factory.create('User', {
      password: '123456',
    });

    const compareHash = await bcrypt.compare('123456', user.password_hash);

    expect(compareHash).toBe(true);
  });

  it('should be able to register', async () => {
    const user = await factory.attrs('User');

    const response = await saveUser(user);

    expect(response.body).toHaveProperty('id');
  });

  it('should not be able to register with duplicated email', async () => {
    const user = await factory.attrs('User');

    await saveUser(user);

    const response = await saveUser(user);

    expect(response.body.error).toBe('Usuário já existente.');
  });

  it('should return invalid email', async () => {
    const { name, password } = await factory.attrs('User');

    const response = await saveUser({
      name,
      email: 'teste.com',
      password,
    });

    expect(response.body.error).toBe('Email inválido.');
  });

  afterAll(async () => {
    await truncate();
  });
});
