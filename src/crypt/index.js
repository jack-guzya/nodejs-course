const bcrypt = require('bcrypt');
const saltRounds = 10;

const getHash = input => bcrypt.hash(input, saltRounds);

const compare = (input, hash) => bcrypt.compare(input, hash);

module.exports = { compare, getHash };
