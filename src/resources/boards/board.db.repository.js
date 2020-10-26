const Board = require('./board.model.js');
const { rest } = require('../../errors');

const checkBoardExists = (board, id) => {
  if (!board) {
    throw new rest.NotFound(`Board not found: ${id}`);
  }
};

const getAll = async () => Board.find({});

const get = async id => {
  const board = await Board.findById(id);
  checkBoardExists(board, id);

  return board;
};

const create = async board => Board.create(board);

const update = async (id, params) => {
  const board = await Board.findByIdAndUpdate(id, params, { new: true });
  checkBoardExists(board, id);

  return board;
};

const deleteBoard = async id => {
  const board = await Board.findByIdAndDelete(id);
  checkBoardExists(board, id);

  return board;
};

module.exports = { getAll, get, create, update, delete: deleteBoard };
