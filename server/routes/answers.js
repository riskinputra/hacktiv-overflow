const express = require('express');
const router = express.Router();
const AnswerController = require('../controllers/answers')
const middleware = require('../middleware/authentication')

module.exports = router
  .get('/', AnswerController.getAllAnswer)
  .post('/', middleware, AnswerController.createAnswer)
  .delete('/:id', middleware, AnswerController.removeAnswer)
  .put('/:id/upvote', middleware, AnswerController.upVoteAnswer)
  .put('/:id/downvote', middleware, AnswerController.downVoteAnswer)
