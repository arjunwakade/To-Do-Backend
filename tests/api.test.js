const request = require('supertest');
const passport = require('./mocks/passport');
const mongoose = require('mongoose');
const app = require('../server.js');

describe('To-Do API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Unauthenticated Requests', () => {
    beforeEach(() => {
      // Set unauthenticated state
      passport.__setAuthenticatedState(false);
    });

    it('should return 401 for unauthenticated todos request', async () => {
      const res = await request(app)
        .get('/api/todos')
        .set('Cookie', ['connect.sid=test-session-id']);
      
      expect(res.statusCode).toEqual(401);
      expect(res.body).toHaveProperty('msg', 'Not authorized');
    });
  });

  describe('Authenticated Requests', () => {
    beforeEach(() => {
      // Set authenticated state
      passport.__setAuthenticatedState(true);
    });

    it('should return todos for authenticated user', async () => {
      const res = await request(app)
        .get('/api/todos')
        .set('Cookie', ['connect.sid=test-session-id']);
      
      expect(res.statusCode).toEqual(200);
      expect(Array.isArray(res.body)).toBe(true);
    });
  });
});