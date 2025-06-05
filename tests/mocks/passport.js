const mockUser = {
  id: 'test-user-id',
  googleId: 'test-google-id',
  displayName: 'Test User',
  email: 'test@example.com'
};

const createMockSession = (isAuthenticated = false) => ({
  touch: jest.fn(),
  save: jest.fn(cb => cb && cb()),
  id: 'test-session-id',
  cookie: {
    maxAge: 24 * 60 * 60 * 1000
  },
  passport: {
    user: isAuthenticated ? mockUser : null
  }
});

let isAuthenticatedState = false;

const mock = {
  initialize: jest.fn(() => (req, res, next) => {
    req.isAuthenticated = jest.fn(() => isAuthenticatedState);
    req.user = isAuthenticatedState ? mockUser : null;
    req.session = createMockSession(isAuthenticatedState);
    next();
  }),

  session: jest.fn(() => (req, res, next) => {
    req.session = createMockSession(isAuthenticatedState);
    next();
  }),

  authenticate: jest.fn(() => (req, res, next) => {
    req.isAuthenticated = jest.fn(() => isAuthenticatedState);
    req.user = isAuthenticatedState ? mockUser : null;
    req.session = createMockSession(isAuthenticatedState);
    next();
  }),

  use: jest.fn(),

  serializeUser: jest.fn((callback) => {
    callback(mockUser, (err, id) => id);
  }),

  deserializeUser: jest.fn((callback) => {
    callback('test-user-id', (err, user) => mockUser);
  }),

  // Add helper method to control authentication state in tests
  __setAuthenticatedState: (state) => {
    isAuthenticatedState = state;
  }
};

jest.mock('passport', () => mock);

jest.mock('passport-google-oauth20', () => ({
  Strategy: jest.fn((config, callback) => ({
    name: 'google',
    authenticate: jest.fn()
  }))
}));

module.exports = mock;