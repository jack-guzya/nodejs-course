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
      title: req.body.title,
      order: req.body.order,
      description: req.body.description,
      userId: req.body.userId,
      columnId: req.body.columnId,
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
      {
        title: req.body.title,
        order: req.body.order,
        description: req.body.description,
        userId: req.body.userId,
        columnId: req.body.columnId,
        boardId: req.body.boardId || req.params.boardId
      }
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
