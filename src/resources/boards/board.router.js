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

router.route('/:boardId').get(
  asyncHandleError(async (req, res) => {
    const board = await boardService.get(req.params.boardId);
    res.json(board);
  })
);

router.route('/:boardId').put(
  asyncHandleError(async (req, res) => {
    const board = await boardService.update(req.params.boardId, req.body);
    res.json(board);
  })
);

router.route('/:boardId').delete(
  asyncHandleError(async (req, res) => {
    await boardService.delete(req.params.boardId);
    await taskService.deleteAll(req.params.boardId);

    res.status(204).json({ message: 'The board has been deleted' });
  })
);

module.exports = router;