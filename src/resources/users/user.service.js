const usersRepo = require('./user.memory.repository');

const getAll = () => usersRepo.getAll();

const get = id => usersRepo.get(id);

const create = userParams => usersRepo.create(userParams);

module.exports = { getAll, get, create };
