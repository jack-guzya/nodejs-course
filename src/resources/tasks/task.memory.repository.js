const DB = require('../../common/db');
const { RestError } = require('../../helpers/errors');

const getAll = async boardId => {
  const all = await DB.getAll(DB.TABLES.TASKS);
  const tasks = all.filter(task => task.boardId === boardId);

  if (!tasks.length) {
    throw new RestError(404, `Cannot get tasks by board id: ${boardId}`);
  }

  return tasks;
};

const get = async ({ taskId, boardId }) => {
  const [task] = await DB.find(DB.TABLES.TASKS)(
    item => item.id === taskId && item.boardId === boardId
  );

  if (!task) {
    throw new RestError(404, `Cannot get the task by id: ${taskId}`);
  }

  return task;
};

const update = async ({ taskId, boardId }, params) => {
  const task = await get({ taskId, boardId });
  const updatedTask = await DB.update(DB.TABLES.TASKS)(task.id, params);

  if (!updatedTask) {
    throw new RestError(
      404,
      `Cannot update the task by id: ${taskId}. This task is not exist.`
    );
  }

  return updatedTask;
};

const deleteTask = async ({ taskId, boardId }) => {
  const task = await get({ taskId, boardId });
  const deleted = await DB.delete(DB.TABLES.TASKS)(task.id);

  if (!deleted) {
    throw new RestError(
      404,
      `Cannot delete the task by id: ${taskId}. This task is not exist.`
    );
  }

  return deleted;
};

const create = async entity => {
  const task = await DB.create(DB.TABLES.TASKS)(entity);

  return task;
};

module.exports = { getAll, get, create, update, delete: deleteTask };
