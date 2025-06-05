class MockSchema {
  constructor(definition) {
    this.definition = definition;
  }

  // Add method chaining support
  pre() { return this; }
  post() { return this; }
  set() { return this; }
}

// Create mock data
const mockTodos = [{ _id: '1', task: 'Test Todo', completed: false }];

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
    find: jest.fn().mockResolvedValue(mockTodos),
    create: jest.fn().mockResolvedValue(mockTodos[0])
  })
}));

module.exports = mongoose;