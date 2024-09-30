import request from 'supertest';
import app from '../index';  // Asegúrate de que esté exportado en index.ts

describe('Integración: Auth y Órganos', () => {
  let token = '';

  it('Debería registrar y autenticar un proveedor y permitir la creación de órganos', async () => {
    // Registrar proveedor
    const res1 = await request(app)
      .post('/api/auth/register/provider')
      .send({
        name: 'Proveedor Integración',
        email: 'proveedor@integracion.com',
        password: '123456',
      });
    expect(res1.statusCode).toEqual(200);
    token = res1.body.token;

    // Crear un órgano
    const res2 = await request(app)
      .post('/api/organs')
      .set('Authorization', `Bearer ${token}`)
      .send({
        type: 'Corazón',
        description: 'Corazón saludable',
        price: 60000,
        provider_id: 1,
      });
    expect(res2.statusCode).toEqual(200);
    expect(res2.body).toHaveProperty('id');
  });
});
