const taskRepo = require('./task.db.repository');

const getAll = boardId => taskRepo.getAll(boardId);

const create = task => taskRepo.create(task);

const get = ({ id, boardId }) => taskRepo.get({ id, boardId });

const update = ({ id, boardId }, data) =>
  taskRepo.update({ id, boardId }, data);

const deleteTask = ({ id, boardId }) => taskRepo.delete({ id, boardId });

const deleteAll = boardId => taskRepo.deleteAll(boardId);

const deleteUserInTasks = userId =>
  taskRepo.updateMany({ userId }, { userId: null });

module.exports = {
  create,
  getAll,
  get,
  update,
  delete: deleteTask,
  deleteAll,
  deleteUserInTasks
};
