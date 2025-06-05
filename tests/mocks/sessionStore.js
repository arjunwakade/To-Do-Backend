const mockStore = {
  on: jest.fn(),
  get: jest.fn(),
  set: jest.fn(),
  destroy: jest.fn(),
  all: jest.fn(),
  clear: jest.fn(),
  touch: jest.fn()
};

jest.mock('connect-mongo', () => ({
  create: jest.fn().mockReturnValue(mockStore)
}));

module.exports = mockStore;