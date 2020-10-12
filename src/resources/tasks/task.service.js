const taskRepo = require('./task.memory.repository');
const { Task } = require('./task.model');

const getAll = async boardId => {
  const tasks = await taskRepo.getByBoardId(boardId);

  return tasks;
};

const create = async params => {
  const task = await taskRepo.create(new Task(params));

  return task;
};

const get = async ({ id, boardId }) => {
  const task = await taskRepo.get({ id, boardId });

  return task;
};

const update = async ({ id, boardId }, params) => {
  const task = await taskRepo.get({ id, boardId });
  const board = await taskRepo.update(task.id, params);

  return board;
};

const deleteTask = async ({ id, boardId }) => {
  const task = await taskRepo.get({ id, boardId });
  const deletedTask = await taskRepo.delete(task.id);

  return deletedTask;
};

const deleteAll = async boardId => {
  const tasks = await taskRepo.deleteAll(boardId);

  return tasks;
};

const deleteUserInTasks = async userId => {
  const tasks = await taskRepo.find(task => task.userId === userId);

  tasks.length &&
    tasks.forEach(
      async task => await taskRepo.update(task.id, { userId: null })
    );

  return tasks;
};

module.exports = {
  create,
  getAll,
  get,
  update,
  delete: deleteTask,
  deleteAll,
  deleteUserInTasks
};
