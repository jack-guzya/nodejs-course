const router = require('express').Router({ mergeParams: true });
const { StatusCodes } = require('http-status-codes');
const taskService = require('./task.service');
const Task = require('./task.model');
const { validate } = require('./task.validation');
const error = require('../../errors');

router.route('/').get(
  error.wrapper(async (req, res) => {
    const tasks = await taskService.getAll(req.params.boardId);
    res.json(tasks.map(Task.toResponse));
  })
);

router.route('/').post(
  validate,
  error.wrapper(async (req, res) => {
    const task = await taskService.create({
      ...req.body,
      boardId: req.body.boardId || req.params.boardId
    });
    res.json(Task.toResponse(task));
  })
);

router.route('/:id').get(
  error.wrapper(async (req, res) => {
    const task = await taskService.get(req.params);
    res.json(Task.toResponse(task));
  })
);

router.route('/:id').put(
  validate,
  error.wrapper(async (req, res) => {
    const task = await taskService.update(req.params, {
      ...req.body,
      boardId: req.body.boardId || req.params.boardId
    });
    res.json(Task.toResponse(task));
  })
);

router.route('/:id').delete(
  error.wrapper(async (req, res) => {
    await taskService.delete(req.params);
    res.sendStatus(StatusCodes.NO_CONTENT);
  })
);

module.exports = router;
