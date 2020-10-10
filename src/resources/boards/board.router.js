const router = require('express').Router();
const { asyncHandleError } = require('../../helpers/errors');
const boardService = require('./board.service');

router.route('/').post(
  asyncHandleError(async (req, res) => {
    const board = await boardService.create(req.body);
    res.json(board);
  })
);

module.exports = router;
