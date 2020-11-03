const router = require('express').Router();
const loginService = require('./login.service');
const { validate } = require('./login.validation');
const error = require('../../errors');

router.route('/').post(
  validate,
  error.wrapper(async (req, res) => {
    const token = await loginService.signIn(req.body);
    res.json({ token });
  })
);

module.exports = router;
