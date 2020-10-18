const DB = require('../../common/inMemoryDb');
const { RestError } = require('../../utils/error-handler.js');

const getAll = async () => DB.getAll(DB.TABLES.USERS);

const get = async id => {
  const user = await DB.get(DB.TABLES.USERS)(id);

  if (!user) {
    throw new RestError(404, `User not found: ${id}`);
  }

  return user;
};

const create = async params => DB.create(DB.TABLES.USERS)(params);

const update = async (id, params) => {
  await get(id);

  return DB.update(DB.TABLES.USERS)(id, params);
};

const deleteUser = async id => {
  await get(id);

  return DB.delete(DB.TABLES.USERS)(id);
};

module.exports = { getAll, get, create, update, delete: deleteUser };
