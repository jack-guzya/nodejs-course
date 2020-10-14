const router = require('express').Router();
const { asyncHandleError } = require('../../helpers/errors');
const usersService = require('./user.service');
const { validate } = require('./user.validation');

router.route('/').get(
  asyncHandleError(async (req, res) => {
    const users = await usersService.getAll();
    res.json(users);
  })
);

router.route('/').post(
  validate,
  asyncHandleError(async (req, res) => {
    const user = await usersService.create(req.body);
    res.json(user);
  })
);

router.route('/:id').get(
  asyncHandleError(async (req, res) => {
    const user = await usersService.get(req.params.id);
    res.json(user);
  })
);

router.route('/:id').put(
  validate,
  asyncHandleError(async (req, res) => {
    const user = await usersService.update(req.params.id, req.body);
    res.json(user);
  })
);

router.route('/:id').delete(
  asyncHandleError(async (req, res) => {
    await usersService.delete(req.params.id);

    res.sendStatus(204);
  })
);

module.exports = router;
