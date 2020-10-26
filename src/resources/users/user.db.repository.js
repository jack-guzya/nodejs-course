const User = require('./user.model');
const { rest } = require('../../errors');

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

const create = async params => User.create(params);

const update = async (id, params) => {
  const user = await User.findOneAndUpdate({ _id: id }, params);
  checkUserExists(user, id);

  return user;
};

const deleteUser = async id => {
  const user = await User.findOneAndDelete({ _id: id });
  checkUserExists(user, id);

  return user;
};

module.exports = { getAll, get, create, update, delete: deleteUser };
