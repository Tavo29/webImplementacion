import request from 'supertest';
import app from '../index';  // Asegúrate de que esté exportado en index.ts

describe('Organ API', () => {
  let token = '';

  beforeAll(async () => {
    // Registra y autentica un proveedor para obtener el token JWT
    const res = await request(app)
      .post('/api/auth/register/provider')
      .send({
        name: 'Proveedor Órgano',
        email: 'proveedor@organo.com',
        password: '123456',
      });
    token = res.body.token;
  });

  it('Debería crear un órgano', async () => {
    const res = await request(app)
      .post('/api/organs')
      .set('Authorization', `Bearer ${token}`)
      .send({
        type: 'Riñón',
        description: 'Riñón saludable',
        price: 50000,
        provider_id: 1,
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('id');
  });

  it('Debería obtener todos los órganos', async () => {
    const res = await request(app)
      .get('/api/organs')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
  });
});
