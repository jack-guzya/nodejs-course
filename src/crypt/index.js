const bcrypt = require('bcrypt');
const saltRounds = 10;

const encrypt = (req, res, next) => {
  bcrypt
    .hash(req.body.password, saltRounds)
    .then(hash => {
      req.body.password = hash;
      next();
    })
    .catch(e => next(e));
};

const compare = (input, hash) => bcrypt.compare(input, hash);

module.exports = { encrypt, compare };
