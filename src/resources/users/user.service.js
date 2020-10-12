const User = require('./user.model');
const userValidation = require('./user.validation');
const usersRepo = require('./user.memory.repository');

const getAll = async () => {
  const users = await usersRepo.getAll();

  return users.map(User.toResponse);
};

const get = async id => {
  const user = await usersRepo.get(id);

  return User.toResponse(user);
};

const create = async data => {
  userValidation.isData(data);

  const user = await usersRepo.create(new User(data));

  return User.toResponse(user);
};

const update = async (id, data) => {
  userValidation.isData(data);

  await usersRepo.get(id);
  const user = await usersRepo.update(id, data);

  return User.toResponse(user);
};

const deleteUser = async id => {
  await usersRepo.get(id);
  const user = await usersRepo.delete(id);

  return User.toResponse(user);
};

module.exports = { getAll, get, create, update, delete: deleteUser };
