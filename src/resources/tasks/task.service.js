const { Task } = require('./task.model');
const taskRepo = require('./task.memory.repository');

const getAll = async boardId => taskRepo.getAll(boardId);

const create = async data => taskRepo.create(new Task(data));

const get = async queryParams => taskRepo.get(queryParams);

const update = async (queryParams, data) => taskRepo.update(queryParams, data);

const deleteTask = async queryParams => taskRepo.delete(queryParams);

const deleteAll = async boardId => taskRepo.deleteAll(boardId);

const deleteUserInTasks = async userId => {
  const tasks = await taskRepo.find(task => task.userId === userId);

  tasks.length &&
    tasks.forEach(async task => await taskRepo.update(task, { userId: null }));

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
