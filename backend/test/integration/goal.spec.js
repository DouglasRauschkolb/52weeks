const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('GOAL', () => {
  beforeEach( async () => {
    await connection.migrate.rollback();
    await connection.migrate.latest();
  });

  afterAll(async () => {
    await connection.destroy();
  })

  it('should be able to create a new GOAL', async () => {
    const response = await request(app)
      .post('/goals')
      .send({
        name : "TESTE3",
        base_value	: 10
      });

    expect(response.body).toHaveProperty('id');
    expect(response.body.id).toHaveLength(8);
  });
});