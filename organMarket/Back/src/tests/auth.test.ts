import request from 'supertest';
import app from '../index';  // Asegúrate de que esté exportado en index.ts

describe('Auth API', () => {
  it('Debería registrar un nuevo proveedor', async () => {
    const res = await request(app)
      .post('/api/auth/register/provider')
      .send({
        name: 'Proveedor Test',
        email: 'proveedor@test.com',
        password: '123456',
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('token');
  });

  it('Debería fallar al registrar un proveedor con email ya existente', async () => {
    const res = await request(app)
      .post('/api/auth/register/provider')
      .send({
        name: 'Proveedor Duplicado',
        email: 'proveedor@test.com',  // Mismo email para fallar
        password: '123456',
      });
    expect(res.statusCode).toEqual(400);
  });
});
