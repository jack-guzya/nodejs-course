const User = require('./user.model');
const usersRepo = require('./user.memory.repository');

const getAll = async () => {
  const users = await usersRepo.getAll();

  return users.map(User.toResponse);
};

const get = async id => {
  const user = await usersRepo.get(id);

  return User.toResponse(user);
};

const create = async userParams => {
  const user = await usersRepo.create(new User(userParams));

  return User.toResponse(user);
};

const update = async (id, { name, login, password }) => {
  const user = await usersRepo.update(id, { name, login, password });

  return User.toResponse(user);
};

const deleteUser = async id => {
  const user = await usersRepo.delete(id);

  return User.toResponse(user);
};

module.exports = { getAll, get, create, update, delete: deleteUser };
