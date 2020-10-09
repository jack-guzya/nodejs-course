const DB = require('../../common/db');

const getAll = async () => DB.getAll(DB.TABLES.USERS);

const get = async id => {
  const user = await DB.get(DB.TABLES.USERS)(id);

  if (!user) {
    throw new Error(`Cannot get the user by id: ${id}`);
  }

  return user;
};

const create = async params => {
  const user = await DB.create(DB.TABLES.USERS)(params);

  return user;
};

const update = async (id, params) => {
  const user = await DB.update(DB.TABLES.USERS)(id, params);

  if (!user) {
    throw new Error(
      `Cannot update the user by id: ${id}. This user is not exist.`
    );
  }

  return user;
};

const deleteUser = async id => {
  const user = await DB.delete(DB.TABLES.USERS)(id);

  if (!user) {
    throw new Error(
      `Cannot delete the user by id: ${id}. This user is not exist.`
    );
  }

  return user;
};

module.exports = { getAll, get, create, update, delete: deleteUser };
