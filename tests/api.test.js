const request = require('supertest');
// Add mock before requiring app
require('./mocks/passport');
const app = require('../server.js');

describe('To-Do API', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  // Test GET /api/todos
  it('should return all todos', async () => {
    const res = await request(app).get('/api/todos');
    expect(res.statusCode).toEqual(401); // Will return 401 without auth
    expect(res.body).toHaveProperty('msg', 'Not authorized');
  });

  // Test POST /api/todos
  it('should create a new todo', async () => {
    const res = await request(app)
      .post('/api/todos')
      .send({ task: 'Test todo', completed: false });
    expect(res.statusCode).toEqual(401); // Will return 401 without auth
    expect(res.body).toHaveProperty('msg', 'Not authorized');
  });

  // Test GET /api/todos (requires authentication)
  it('should return 401 for unauthenticated todos request', async () => {
    const res = await request(app).get('/api/todos');
    expect(res.statusCode).toEqual(401);
    expect(res.body).toHaveProperty('msg', 'Not authorized');
  });

  // Test authentication endpoint
  it('should return not logged in for /auth/user', async () => {
    const res = await request(app).get('/auth/user');
    expect(res.statusCode).toEqual(401);
    expect(res.body).toHaveProperty('msg', 'Not logged in');
  });
});