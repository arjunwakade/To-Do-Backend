const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
  userId: String, // link to the user
  task: String,
  completed: Boolean
});

module.exports = mongoose.model('Todo', TodoSchema);