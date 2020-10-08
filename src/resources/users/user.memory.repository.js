const DB = require('../../common/db');

const getAll = async () => DB.getAll(DB.TABLES.USERS);

const get = async id => {
  const user = DB.get(DB.TABLES.USERS)(id);

  if (!user) {
    throw new Error(`Cannot get the user by id: ${id}`);
  }

  return user;
};

const create = async user => {
  DB.create(DB.TABLES.USERS)(user);

  return get(user.id);
};

module.exports = { getAll, get, create };
