const router = require('express').Router();
const usersService = require('./user.service');
const { asyncHandleError } = require('../../helpers/errors');

router.route('/').get(async (req, res) => {
  const users = await usersService.getAll();
  res.json(users);
});

router.route('/:id').get(
  asyncHandleError(async (req, res) => {
    const user = await usersService.get(req.params.id);
    res.json(user);
  })
);

router.route('/').post(
  asyncHandleError(async (req, res) => {
    const user = await usersService.create(req.body);
    res.json(user);
  })
);

router.route('/:id').put(
  asyncHandleError(async (req, res) => {
    const user = await usersService.update(req.params.id, req.body);
    res.json(user);
  })
);

router.route('/:id').delete(
  asyncHandleError(async (req, res) => {
    const user = await usersService.delete(req.params.id);
    res.json(user);
  })
);

module.exports = router;
