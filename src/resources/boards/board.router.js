const router = require('express').Router();
const { asyncHandleError } = require('../../helpers/errors');
const boardService = require('./board.service');

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
    const board = await boardService.delete(req.params.id);
    res.json(board);
  })
);

module.exports = router;
