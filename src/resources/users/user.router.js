const router = require('express').Router();
const { StatusCodes } = require('http-status-codes');
const usersService = require('./user.service');
const User = require('./user.model');
const { validate } = require('./user.validation');
const { asyncHandleError } = require('../../utils/error-handler.js');

router.route('/').get(
  asyncHandleError(async (req, res) => {
    const users = await usersService.getAll();
    res.json(users.map(User.toResponse));
  })
);

router.route('/').post(
  validate,
  asyncHandleError(async (req, res) => {
    const user = await usersService.create(req.body);
    res.json(User.toResponse(user));
  })
);

router.route('/:id').get(
  asyncHandleError(async (req, res) => {
    const user = await usersService.get(req.params.id);
    res.json(User.toResponse(user));
  })
);

router.route('/:id').put(
  validate,
  asyncHandleError(async (req, res) => {
    const user = await usersService.update(req.params.id, req.body);
    res.json(User.toResponse(user));
  })
);

router.route('/:id').delete(
  asyncHandleError(async (req, res) => {
    await usersService.delete(req.params.id);

    res.sendStatus(StatusCodes.NO_CONTENT);
  })
);

module.exports = router;
