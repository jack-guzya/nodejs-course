const { Schema, model } = require('mongoose');
const uuid = require('uuid');

const taskSchema = new Schema({
  _id: {
    type: String,
    default: uuid
  },
  title: String,
  order: Number,
  description: String,
  userId: String,
  boardId: String,
  columnId: String
});

taskSchema.statics.toResponse = task => {
  const { id, title, order, description, userId, boardId, columnId } = task;

  return { id, title, order, description, userId, boardId, columnId };
};

const Task = model('Task', taskSchema);

module.exports = Task;
