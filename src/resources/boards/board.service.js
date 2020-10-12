const { Board } = require('./board.model');
const boardValidation = require('./board.validation');
const boardRepo = require('./board.memory.repository');

const getAll = async () => {
  const board = await boardRepo.getAll();

  return board;
};

const create = async data => {
  boardValidation.isData(data);

  const board = await boardRepo.create(new Board(data));

  return board;
};

const get = async id => {
  const board = await boardRepo.get(id);

  return board;
};

const update = async (id, data) => {
  boardValidation.isData(data);

  await boardRepo.get(id);
  const board = await boardRepo.update(id, data);

  return board;
};

const deleteBoard = async id => {
  await boardRepo.get(id);
  const board = await boardRepo.delete(id);

  return board;
};

module.exports = { create, getAll, get, update, delete: deleteBoard };
