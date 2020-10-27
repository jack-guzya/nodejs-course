const router = require('express').Router();
const loginService = require('./login.service');
const { validate } = require('./login.validation');
const error = require('../../errors');

router.route('/').post(
  validate,
  error.wrapper(async (req, res) => {
    const user = await loginService.signIn(req.body);
    res.json(user);
  })
);

module.exports = router;
