const taskRepo = require('./task.memory.repository');
const { Task } = require('./task.model');

const getAll = async boardId => {
  const tasks = await taskRepo.getAll(boardId);

  return tasks;
};

const create = async params => {
  const task = await taskRepo.create(new Task(params));

  return task;
};

const get = async ({ taskId, boardId }) => {
  const task = await taskRepo.get({ taskId, boardId });

  return task;
};

const update = async ({ taskId, boardId }, params) => {
  const board = await taskRepo.update({ taskId, boardId }, params);

  return board;
};

const deleteTask = async ({ taskId, boardId }) => {
  const task = await taskRepo.delete({ taskId, boardId });

  return task;
};

module.exports = { create, getAll, get, update, delete: deleteTask };
