const DB = require('../../common/db');
const { RestError } = require('../../helpers/errors');

const find = DB.find(DB.TABLES.TASKS);

const getAll = async boardId => find(task => task.boardId === boardId);

const get = async ({ id, boardId }) => {
  const [task] = await find(item => item.id === id && item.boardId === boardId);

  if (!task) {
    throw new RestError(404, `Task not found: ${id}`);
  }

  return task;
};

const create = async entity => DB.create(DB.TABLES.TASKS)(entity);

const update = async ({ id, boardId }, params) => {
  await get({ id, boardId });
  const task = await DB.update(DB.TABLES.TASKS)(id, params);

  return task;
};

const deleteTask = async ({ id, boardId }) => {
  await get({ id, boardId });
  const task = await DB.delete(DB.TABLES.TASKS)(id);

  return task;
};

const deleteAll = async boardId => {
  const tasks = await getAll(boardId);

  tasks.length &&
    tasks.forEach(async task => await DB.delete(DB.TABLES.TASKS)(task.id));

  return tasks;
};

module.exports = {
  getAll,
  get,
  create,
  update,
  delete: deleteTask,
  deleteAll,
  find
};
