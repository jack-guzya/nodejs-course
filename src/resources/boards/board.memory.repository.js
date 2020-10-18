const DB = require('../../common/db');
const { RestError } = require('../../utils/error-handler.js');

const getAll = async () => DB.getAll(DB.TABLES.BOARDS);

const get = async id => {
  const board = await DB.get(DB.TABLES.BOARDS)(id);

  if (!board) {
    throw new RestError(404, `Board not found: ${id}`);
  }

  return board;
};

const create = async params => DB.create(DB.TABLES.BOARDS)(params);

const update = async (id, params) => {
  await get(id);
  const board = await DB.update(DB.TABLES.BOARDS)(id, params);

  return board;
};

const deleteBoard = async id => {
  await get(id);
  const board = await DB.delete(DB.TABLES.BOARDS)(id);

  return board;
};

module.exports = { getAll, get, create, update, delete: deleteBoard };
