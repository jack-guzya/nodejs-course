const { Schema, model } = require('mongoose');
const uuid = require('uuid');

const columnSchema = new Schema({
  _id: {
    type: String,
    default: uuid
  },
  title: {
    type: String,
    default: 'Column'
  },
  order: {
    type: Number,
    default: 0
  }
});

const boardSchema = new Schema({
  _id: {
    type: String,
    default: uuid
  },
  title: {
    type: String,
    default: 'Board'
  },
  columns: [columnSchema]
});

boardSchema.statics.toResponse = board => {
  const { title, columns, id } = board;

  return {
    title,
    columns,
    id
  };
};

const Board = model('Board', boardSchema);

module.exports = Board;
