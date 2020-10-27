const router = require('express').Router();
const { StatusCodes } = require('http-status-codes');
const usersService = require('./user.service');
const User = require('./user.model');
const { validate } = require('./user.validation');
const error = require('../../errors');
const crypt = require('../../crypt');

router.route('/').get(
  error.wrapper(async (req, res) => {
    const users = await usersService.getAll();
    res.json(users.map(User.toResponse));
  })
);

router.route('/').post(
  validate,
  crypt.encrypt,
  error.wrapper(async (req, res) => {
    const user = await usersService.create(req.body);
    res.json(User.toResponse(user));
  })
);

router.route('/:id').get(
  error.wrapper(async (req, res) => {
    const user = await usersService.get(req.params.id);
    res.json(User.toResponse(user));
  })
);

router.route('/:id').put(
  validate,
  error.wrapper(async (req, res) => {
    const user = await usersService.update(req.params.id, req.body);
    res.json(User.toResponse(user));
  })
);

router.route('/:id').delete(
  error.wrapper(async (req, res) => {
    await usersService.delete(req.params.id);

    res.sendStatus(StatusCodes.NO_CONTENT);
  })
);

module.exports = router;
