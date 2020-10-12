const DB = require('../../common/db');
const { RestError } = require('../../helpers/errors');

const getAll = async () => DB.getAll(DB.TABLES.BOARDS);

const get = async id => {
  const board = await DB.get(DB.TABLES.BOARDS)(id);

  if (!board) {
    throw new RestError(
      404,
      `Cannot get the board by id: ${id}. Board not found`
    );
  }

  return board;
};

const update = async (id, params) => {
  const board = await DB.update(DB.TABLES.BOARDS)(id, params);

  if (!board) {
    throw new RestError(
      404,
      `Cannot update the board by id: ${id}. Board not found`
    );
  }

  return board;
};

const deleteBoard = async id => {
  const board = await DB.delete(DB.TABLES.BOARDS)(id);

  if (!board) {
    throw new RestError(
      404,
      `Cannot delete the board by id: ${id}. Board not found`
    );
  }

  return board;
};

const create = async params => {
  const board = await DB.create(DB.TABLES.BOARDS)(params);

  return board;
};

module.exports = { getAll, get, create, update, delete: deleteBoard };
