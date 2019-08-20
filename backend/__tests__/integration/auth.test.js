import request from 'supertest';

import app from '../../src/app';

describe('Auth', () => {
  it('should return token not provided', async () => {
    const response = await request(app).get('/schedule');

    expect(response.body.error).toBe('Token não encontrado.');
  });

  it('should return token invalid', async () => {
    const response = await request(app)
      .get('/schedule')
      .set('Authorization', 'sdsdsdsd');

    expect(response.body.error).toBe('Token inválido.');
  });
});
