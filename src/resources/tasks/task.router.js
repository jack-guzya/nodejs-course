const router = require('express').Router({ mergeParams: true });
const { asyncHandleError } = require('../../utils/error-handler.js');
const taskService = require('./task.service');
const { validate } = require('./task.validation');

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
    res.sendStatus(204);
  })
);

module.exports = router;
