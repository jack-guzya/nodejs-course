const router = require('express').Router();
const usersService = require('./user.service');

router.route('/').get(async (req, res) => {
  const users = await usersService.getAll();
  res.json(users);
});

router.route('/:id').get(async (req, res) => {
  try {
    const user = await usersService.get(req.params.id);
    res.json(user);
  } catch (e) {
    res.status(404).send(e.message);
  }
});

router.route('/').post(async (req, res) => {
  try {
    const user = await usersService.create(req.body);
    res.json(user);
  } catch (e) {
    res.status(404).send(e.message);
  }
});

router.route('/:id').put(async (req, res) => {
  try {
    const user = await usersService.update(req.params.id, req.body);
    res.json(user);
  } catch (e) {
    res.status(404).send(e.message);
  }
});

router.route('/:id').delete(async (req, res) => {
  try {
    const user = await usersService.delete(req.params.id);
    res.json(user);
  } catch (e) {
    res.status(404).send(e.message);
  }
});

module.exports = router;
