const boardRepo = require('./board.db.repository');
const taskService = require('../tasks/task.service');

const getAll = async () => boardRepo.getAll();

const create = async data => boardRepo.create(data);

const get = async id => boardRepo.get(id);

const update = async (id, data) => boardRepo.update(id, data);

const deleteBoard = async id => {
  const board = await boardRepo.delete(id);
  await taskService.deleteAll(id);

  return board;
};

module.exports = { create, getAll, get, update, delete: deleteBoard };
