const User = require('./user.model');
const { rest } = require('../../errors');
const crypt = require('../../crypt');

const checkUserExists = (user, id) => {
  if (!user) {
    throw new rest.NotFound(`User not found: ${id}`);
  }
};

const getAll = async () => User.find({});

const get = async id => {
  const user = await User.findById(id);
  checkUserExists(user, id);

  return user;
};

const getByFilter = async filter => User.find(filter);

const create = async params => {
  const hash = await crypt.getHash(params.password);

  return User.create({ ...params, password: hash });
};

const update = async (id, params) => {
  const hash = await crypt.getHash(params.password);
  const user = await User.findOneAndUpdate(
    { _id: id },
    { ...params, password: hash }
  );
  checkUserExists(user, id);

  return user;
};

const deleteUser = async id => {
  const user = await User.findOneAndDelete({ _id: id });
  checkUserExists(user, id);

  return user;
};

module.exports = {
  getAll,
  get,
  getByFilter,
  create,
  update,
  delete: deleteUser
};
