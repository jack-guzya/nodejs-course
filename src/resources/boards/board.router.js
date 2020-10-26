const router = require('express').Router();
const { StatusCodes } = require('http-status-codes');
const boardService = require('./board.service');
const Board = require('./board.model');
const { validate } = require('./board.validation');
const error = require('../../errors');

router.route('/').get(
  error.wrapper(async (req, res) => {
    const boards = await boardService.getAll(req.body);
    res.json(boards.map(Board.toResponse));
  })
);

router.route('/').post(
  validate,
  error.wrapper(async (req, res) => {
    const board = await boardService.create(req.body);
    res.json(Board.toResponse(board));
  })
);

router.route('/:id').get(
  error.wrapper(async (req, res) => {
    const board = await boardService.get(req.params.id);
    res.json(Board.toResponse(board));
  })
);

router.route('/:id').put(
  validate,
  error.wrapper(async (req, res) => {
    const board = await boardService.update(req.params.id, req.body);
    res.json(Board.toResponse(board));
  })
);

router.route('/:id').delete(
  error.wrapper(async (req, res) => {
    await boardService.delete(req.params.id);
    res.sendStatus(StatusCodes.NO_CONTENT);
  })
);

module.exports = router;
