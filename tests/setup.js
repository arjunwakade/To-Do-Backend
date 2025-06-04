// Close the MongoDB connection after all tests
afterAll(async () => {
  const mongoose = require('mongoose');
  await mongoose.connection.close();
});