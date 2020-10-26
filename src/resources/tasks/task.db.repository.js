const Task = require('./task.model.js');
const { rest } = require('../../errors');

const checkTaskExists = (task, id) => {
  if (!task) {
    throw new rest.NotFound(`Task not found: ${id}`);
  }
};

const getAll = async boardId => Task.find({ boardId });

const get = async ({ id, boardId }) => {
  const [task] = await Task.find({ _id: id, boardId });
  checkTaskExists(task, id);

  return task;
};

const create = async task => Task.create(task);

const update = async ({ id, boardId }, params) => {
  const task = await Task.findOneAndUpdate({ _id: id, boardId }, params, {
    new: true
  });
  checkTaskExists(task, id);

  return task;
};

const updateMany = async (filter, data) => Task.updateMany(filter, data);

const deleteTask = async ({ id, boardId }) => {
  const task = await Task.findOneAndDelete({ _id: id, boardId });
  checkTaskExists(task, id);

  return task;
};

const deleteAll = async boardId => Task.deleteMany({ boardId });

module.exports = {
  getAll,
  get,
  create,
  update,
  updateMany,
  delete: deleteTask,
  deleteAll
};
