const boardRepo = require('./board.memory.repository');
const { Board } = require('./board.model');

const create = async params => {
  const board = await boardRepo.create(new Board(params));

  return board;
};

module.exports = { create };
