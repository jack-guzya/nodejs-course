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
    throw new RestError(404, `Cannot get the task by id: ${id}`);
  }

  return task;
};

const update = async (id, params) => {
  const updatedTask = await DB.update(DB.TABLES.TASKS)(id, params);

  if (!updatedTask) {
    throw new RestError(
      404,
      `Cannot update the task by id: ${id}. This task is not exist.`
    );
  }

  return updatedTask;
};

const deleteTask = async id => {
  const deleted = await DB.delete(DB.TABLES.TASKS)(id);

  if (!deleted) {
    throw new RestError(
      404,
      `Cannot delete the task by id: ${id}. This task is not exist.`
    );
  }

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
