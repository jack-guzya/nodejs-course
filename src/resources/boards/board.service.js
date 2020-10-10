const boardRepo = require('./board.memory.repository');
const { Board } = require('./board.model');

const getAll = async () => {
  const board = await boardRepo.getAll();

  return board;
};

const create = async params => {
  const board = await boardRepo.create(new Board(params));

  return board;
};

const get = async id => {
  const board = await boardRepo.get(id);

  return board;
};

const update = async (id, params) => {
  const board = await boardRepo.update(id, params);

  return board;
};

const deleteBoard = async id => {
  const board = await boardRepo.delete(id);

  return board;
};

module.exports = { create, getAll, get, update, delete: deleteBoard };
