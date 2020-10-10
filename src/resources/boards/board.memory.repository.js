const DB = require('../../common/db');
// const { RestError } = require('../../helpers/errors');

const create = async params => {
  const board = await DB.create(DB.TABLES.BOARDS)(params);

  return board;
};

module.exports = { create };
