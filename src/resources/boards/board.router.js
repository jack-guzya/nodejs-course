const router = require('express').Router();
const { asyncHandleError } = require('../../helpers/errors');
// Services
const boardService = require('./board.service');
const taskService = require('../tasks/task.service');

router.route('/').get(
  asyncHandleError(async (req, res) => {
    const boards = await boardService.getAll(req.body);
    res.json(boards);
  })
);

router.route('/').post(
  asyncHandleError(async (req, res) => {
    const board = await boardService.create(req.body);
    res.json(board);
  })
);

router.route('/:id').get(
  asyncHandleError(async (req, res) => {
    const board = await boardService.get(req.params.id);
    res.json(board);
  })
);

router.route('/:id').put(
  asyncHandleError(async (req, res) => {
    const board = await boardService.update(req.params.id, req.body);
    res.json(board);
  })
);

router.route('/:id').delete(
  asyncHandleError(async (req, res) => {
    await boardService.delete(req.params.id);
    await taskService.deleteAll(req.params.id);

    res.status(204).json({ message: 'The board has been deleted' });
  })
);

module.exports = router;
