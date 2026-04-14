const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongo;
let app;

beforeAll(async () => {
  process.env.JWT_SECRET = 'test_secret_123';
  mongo = await MongoMemoryServer.create();
  process.env.MONGO_URI = mongo.getUri();
  process.env.CLIENT_URL = 'http://localhost:5173';
  app = require('../index');
});

afterAll(async () => {
  await mongoose.connection.close();
  await mongo.stop();
});

describe('Auth routes', () => {
  it('should reject weak passwords on signup', async () => {
    const response = await request(app).post('/api/auth/signup').send({
      username: 'testuser',
      email: 'test@example.com',
      password: 'weak',
    });

    expect(response.statusCode).toBe(400);
  });
});
