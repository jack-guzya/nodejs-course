const router = require('express').Router({ mergeParams: true });
const { asyncHandleError } = require('../../helpers/errors');
const taskService = require('./task.service');

router.route('/').get(
  asyncHandleError(async (req, res) => {
    const tasks = await taskService.getAll(req.params.boardId);
    res.json(tasks);
  })
);

router.route('/').post(
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
    const task = await taskService.get({
      id: req.params.id,
      boardId: req.params.boardId
    });
    res.json(task);
  })
);

router.route('/:id').put(
  asyncHandleError(async (req, res) => {
    const task = await taskService.update(
      {
        id: req.params.id,
        boardId: req.params.boardId
      },
      req.body
    );
    res.json(task);
  })
);

router.route('/:id').delete(
  asyncHandleError(async (req, res) => {
    await taskService.delete({
      id: req.params.id,
      boardId: req.params.boardId
    });
    res.status(204).json({ message: 'The task has been deleted' });
  })
);

module.exports = router;
