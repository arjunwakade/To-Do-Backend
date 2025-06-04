jest.mock('passport-google-oauth20', () => ({
  Strategy: jest.fn((options, callback) => {
    return {};
  })
}));

jest.mock('passport', () => ({
  use: jest.fn(),
  serializeUser: jest.fn(),
  deserializeUser: jest.fn(),
  initialize: jest.fn(() => (req, res, next) => next()),
  session: jest.fn(() => (req, res, next) => next())
}));