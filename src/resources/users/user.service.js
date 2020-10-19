const User = require('./user.model');
const usersRepo = require('./user.db.repository');
const taskService = require('../tasks/task.service');

const getAll = async () => {
  const users = await usersRepo.getAll();

  return users.map(User.toResponse);
};

const get = async id => {
  const user = await usersRepo.get(id);

  return User.toResponse(user);
};

const create = async data => {
  const user = await usersRepo.create(data);

  return User.toResponse(user);
};

const update = async (id, data) => {
  const user = await usersRepo.update(id, data);

  return User.toResponse(user);
};

const deleteUser = async id => {
  const user = await usersRepo.delete(id);
  await taskService.deleteUserInTasks(id);

  return User.toResponse(user);
};

module.exports = { getAll, get, create, update, delete: deleteUser };
