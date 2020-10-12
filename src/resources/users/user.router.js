const router = require('express').Router();
const { asyncHandleError } = require('../../helpers/errors');
// Services
const usersService = require('./user.service');
const taskService = require('../tasks/task.service');

router.route('/').get(async (req, res) => {
  const users = await usersService.getAll();
  res.json(users);
});

router.route('/').post(
  asyncHandleError(async (req, res) => {
    const user = await usersService.create({
      name: req.body.name,
      login: req.body.login,
      password: req.body.password
    });
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
  asyncHandleError(async (req, res) => {
    const user = await usersService.update(req.params.id, {
      name: req.body.name,
      login: req.body.login,
      password: req.body.password
    });
    res.json(user);
  })
);

router.route('/:id').delete(
  asyncHandleError(async (req, res) => {
    await usersService.delete(req.params.id);
    await taskService.deleteUserInTasks(req.params.id);

    res.sendStatus(204);
  })
);

module.exports = router;
