const User = require('./user.model');
const usersRepo = require('./user.db.repository');
const taskService = require('../tasks/task.service');

const getAll = async () => usersRepo.getAll();

const get = async id => usersRepo.get(id);

const getByFilter = filter => usersRepo.getByFilter(filter);

const create = async data => usersRepo.create(data);

const update = async (id, data) => usersRepo.update(id, data);

const deleteUser = async id => {
  const user = await usersRepo.delete(id);
  await taskService.deleteUserInTasks(id);

  return User.toResponse(user);
};

module.exports = {
  getAll,
  get,
  getByFilter,
  create,
  update,
  delete: deleteUser
};
