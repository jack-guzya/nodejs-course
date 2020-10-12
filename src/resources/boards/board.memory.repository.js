const DB = require('../../common/db');
const { RestError } = require('../../helpers/errors');

const getAll = async () => DB.getAll(DB.TABLES.BOARDS);

const get = async id => {
  const board = await DB.get(DB.TABLES.BOARDS)(id);

  if (!board) {
    throw new RestError(404, `Board not found: ${id}`);
  }

  return board;
};

const update = async (id, params) => {
  const board = await DB.update(DB.TABLES.BOARDS)(id, params);

  return board;
};

const deleteBoard = async id => {
  const board = await DB.delete(DB.TABLES.BOARDS)(id);

  return board;
};

const create = async params => {
  const board = await DB.create(DB.TABLES.BOARDS)(params);

  return board;
};

module.exports = { getAll, get, create, update, delete: deleteBoard };
