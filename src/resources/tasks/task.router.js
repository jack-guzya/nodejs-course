const router = require('express').Router({ mergeParams: true });
const { StatusCodes } = require('http-status-codes');
const taskService = require('./task.service');
const { validate } = require('./task.validation');
const { asyncHandleError } = require('../../utils/error-handler.js');

router.route('/').get(
  asyncHandleError(async (req, res) => {
    const tasks = await taskService.getAll(req.params.boardId);
    res.json(tasks);
  })
);

router.route('/').post(
  validate,
  asyncHandleError(async (req, res) => {
    const task = await taskService.create({
      ...req.body,
      boardId: req.body.boardId || req.params.boardId
    });
    res.json(task);
  })
);

router.route('/:id').get(
  asyncHandleError(async (req, res) => {
    const task = await taskService.get(req.params);
    res.json(task);
  })
);

router.route('/:id').put(
  validate,
  asyncHandleError(async (req, res) => {
    const task = await taskService.update(req.params, {
      ...req.body,
      boardId: req.body.boardId || req.params.boardId
    });
    res.json(task);
  })
);

router.route('/:id').delete(
  asyncHandleError(async (req, res) => {
    await taskService.delete(req.params);
    res.sendStatus(StatusCodes.NO_CONTENT);
  })
);

module.exports = router;
