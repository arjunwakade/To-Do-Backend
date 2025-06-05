// Import mocks
require('./mocks/sessionStore.js');

jest.mock('mongoose', () => ({
  connect: jest.fn().mockResolvedValue({}),
  connection: {
    close: jest.fn().mockResolvedValue(true)
  },
  Schema: function() {
    return {
      pre: jest.fn().mockReturnThis(),
      post: jest.fn().mockReturnThis()
    };
  },
  model: jest.fn().mockReturnValue({
    findOne: jest.fn().mockResolvedValue(null),
    find: jest.fn().mockResolvedValue([]),
    create: jest.fn().mockResolvedValue({}),
    save: jest.fn().mockResolvedValue({})
  })
}));

jest.mock('connect-mongo', () => ({
  create: jest.fn().mockReturnValue({})
}));

afterAll(async () => {
  await new Promise(resolve => setTimeout(resolve, 500));
});