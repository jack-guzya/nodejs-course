const userService = require('../users/user.service');
const { rest } = require('../../errors');
const crypt = require('../../crypt');

const signIn = async ({ login, password }) => {
  const [user] = await userService.getByFilter({ login });
  if (!user) {
    throw new rest.Forbidden('Incorrect login');
  }

  const isMatch = await crypt.compare(password, user.password);
  if (!isMatch) {
    throw new rest.Forbidden('Incorrect password');
  }

  return user;
};

module.exports = { signIn };
