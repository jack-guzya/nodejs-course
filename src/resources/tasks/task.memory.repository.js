const DB = require('../../common/db');
const { RestError } = require('../../helpers/errors');

const getAll = async () => DB.getAll(DB.TABLES.TASKS);
const find = DB.find(DB.TABLES.TASKS);

const getByBoardId = async boardId => {
  const tasks = await find(task => task.boardId === boardId);

  return tasks;
};

const get = async ({ id, boardId }) => {
  const [task] = await find(item => item.id === id && item.boardId === boardId);

  if (!task) {
    throw new RestError(404, `Task not found: ${id}`);
  }

  return task;
};

const update = async (id, params) => {
  const updatedTask = await DB.update(DB.TABLES.TASKS)(id, params);

  return updatedTask;
};

const deleteTask = async id => {
  const deleted = await DB.delete(DB.TABLES.TASKS)(id);

  return deleted;
};

const deleteAll = async boardId => {
  const tasks = await getByBoardId(boardId);

  tasks.length &&
    tasks.forEach(async task => await DB.delete(DB.TABLES.TASKS)(task.id));

  return tasks;
};

const create = async entity => {
  const task = await DB.create(DB.TABLES.TASKS)(entity);

  return task;
};

module.exports = {
  getAll,
  getByBoardId,
  get,
  create,
  update,
  delete: deleteTask,
  deleteAll,
  find
};
