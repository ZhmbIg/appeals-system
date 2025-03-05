/// <reference types="jest" />
import request from 'supertest';
import { AppDataSource } from '../src/data-source';
import app from '../src/app';
import { Appeal } from '../src/entity/Appeal.entity';

process.env.NODE_ENV = 'test';

beforeAll(async () => {
  await AppDataSource.initialize();
});

beforeEach(async () => {
  await AppDataSource.getRepository(Appeal).clear();
});

afterAll(async () => {
  await AppDataSource.destroy();
});

describe('Appeals API', () => {
  it('should create a new appeal', async () => {
    const res = await request(app)
      .post('/appeals')
      .send({ subject: 'Тест', text: 'Тестовое обращение' });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.status).toBe('Новое');
  });

  it('should change appeal status to "В работе"', async () => {
    const createRes = await request(app)
      .post('/appeals')
      .send({ subject: 'Тест', text: 'Тестовое обращение' });
    const id = createRes.body.id;

    const takeRes = await request(app)
      .post(`/appeals/${id}/take`)
      .send();
    expect(takeRes.status).toBe(200);
    expect(takeRes.body.status).toBe('В работе');
  });


});