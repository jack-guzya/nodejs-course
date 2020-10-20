const router = require('express').Router();
const boardService = require('./board.service');
const Board = require('./board.model');
const { validate } = require('./board.validation');
const { asyncHandleError } = require('../../utils/error-handler.js');

router.route('/').get(
  asyncHandleError(async (req, res) => {
    const boards = await boardService.getAll(req.body);
    res.json(boards.map(Board.toResponse));
  })
);

router.route('/').post(
  validate,
  asyncHandleError(async (req, res) => {
    const board = await boardService.create(req.body);
    res.json(Board.toResponse(board));
  })
);

router.route('/:id').get(
  asyncHandleError(async (req, res) => {
    const board = await boardService.get(req.params.id);
    res.json(Board.toResponse(board));
  })
);

router.route('/:id').put(
  validate,
  asyncHandleError(async (req, res) => {
    const board = await boardService.update(req.params.id, req.body);
    res.json(Board.toResponse(board));
  })
);

router.route('/:id').delete(
  asyncHandleError(async (req, res) => {
    await boardService.delete(req.params.id);
    res.sendStatus(204);
  })
);

module.exports = router;
