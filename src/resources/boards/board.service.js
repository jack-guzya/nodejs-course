const { Board } = require('./board.model');
const boardValidation = require('./board.validation');
const boardRepo = require('./board.memory.repository');

const getAll = async () => {
  const board = await boardRepo.getAll();

  return board;
};

const create = async ({ title, columns = [] }) => {
  boardValidation.isData(title, columns);

  const board = await boardRepo.create(new Board({ title, columns }));

  return board;
};

const get = async id => {
  const board = await boardRepo.get(id);

  return board;
};

const update = async (id, { title, columns }) => {
  boardValidation.isData(title, columns);

  const board = await boardRepo.update(id, { title, columns });

  return board;
};

const deleteBoard = async id => {
  const board = await boardRepo.delete(id);

  return board;
};

module.exports = { create, getAll, get, update, delete: deleteBoard };
