const request = require('supertest');
const app = require('../server'); // Your Express app

describe('To-Do API', () => {
  // Example: Test GET /todos
  it('should return all todos', async () => {
    const res = await request(app).get('/todos');
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  // Example: Test POST /todos
  it('should create a new todo', async () => {
    const res = await request(app)
      .post('/todos')
      .send({ title: 'Test todo', completed: false });
    expect(res.statusCode).toEqual(201);
    expect(res.body.title).toBe('Test todo');
  });

  // Add more tests for PUT, DELETE as needed
});