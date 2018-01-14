const express = require('express');
const router = express.Router();
const QuestionsController = require('../controllers/questions')
const middleware = require('../middleware/authentication')

/* GET users listing. */

module.exports = router
  .get('/', QuestionsController.getAllQuestions)  
  .post('/', middleware, QuestionsController.createQuestion)
  .get('/:id', QuestionsController.findQuestions)
  .put('/:id', middleware, QuestionsController.updateQuestions)
  .delete('/:id', middleware, QuestionsController.removeQuestions)
  .put('/:id/upvote', middleware, QuestionsController.upVoteQuestion)
  .put('/:id/downvote', middleware, QuestionsController.downVoteQuestion)

