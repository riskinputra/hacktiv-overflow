const Question = require('../models/question')
const jwt = require('jsonwebtoken')

class QuestionsController {
  static getAllQuestions(req, res) {
    Question.find()
    .populate('userId')
    .populate('upVote')
    .populate('downVote')
    .then(result => {
      res.status(200).json({
        message: 'Questions',
        data: result
      })
    })
    .catch(err => res.status(500).send(err))
  }

  static createQuestion(req, res) {
    const userId = jwt.verify(req.headers.token, process.env.SECRET_KEY).id
    let addQuestion = new Question ({
      userId: userId,
      title: req.body.title,
      content: req.body.content
    })
    addQuestion.save()
    .then(result => {
      res.status(200).json({
        message: 'Success to add questions',
        data: result
      })
      .catch(err => {
        res.status(500).send(err)
      })
    })
  }
  
  static findQuestions(req, res) {
    Question.findById(req.params.id)
    .populate('userId')
    .then(result => {
      res.status(200).json({
        message: 'Questions Found',
        data: result
      })
      .catch(err => {
        res.status(500).send(err)
      })
    })
  }

  static updateQuestions(req, res) {
    Question.findById(req.params.id)
    .then(result => {
      result.title = req.body.title || result.title
      result.content = req.body.content || result.content

      result.save()
      .then(dataUpdate => {
        res.status(200).json({
          message: 'Success tot update',
          data: result
        })
      })
      .catch(err => res.status(500).send(err))
    })
    .catch(err => res.status(500).send(err))
  }

  static removeQuestions(req, res) {
    Question.findByIdAndRemove(req.params.id)
    .then(result => {
      res.status(500).json({
        message: 'Success to delete',
        data: result
      })
    })
    .catch(err => res.status(500).send(err))
  }

  static upVoteQuestion(req, res) {
    const userId = jwt.verify(req.headers.token, process.env.SECRET_KEY).id
    Question.findById(req.params.id)
    .then(result => {
      if(result.downVote.indexOf(userId) != -1) {
        result.downVote.splice(result.downVote.indexOf(userId),1);
      }
      if(result.upVote.indexOf(userId) == -1) {
        result.upVote.push(userId)
        result.save()
        .then(newUpVote => {
          res.status(200).json({
            message: 'Success to up Vote',
            data: newUpVote
          })
        })
        .catch(err => res.status(500).send(err))
      } else {
        res.status(500).send('You have clicked up vote')
      }
    })
    .catch(err => res.status(500).send(err))
  }

  static downVoteQuestion(req, res) {
    const userId = jwt.verify(req.headers.token, process.env.SECRET_KEY).id
    // console.log(userId)
    Question.findById(req.params.id)
    .then(result => {
      if(result.upVote.indexOf(userId) != -1) {
        result.upVote.splice(result.upVote.indexOf(userId),1)
      }
      if(result.downVote.indexOf(userId) == -1) {
        result.downVote.push(userId)
        result.save()
        .then(newDownVote => {
          res.status(200).json({
            message: 'Success to down Vote',
            data: newDownVote
          })
        })
        .catch(err => res.status(500).send(err))
      } else {
        res.status(500).send('You have clicked down vote')
      }
    })
    .catch(err => res.status(500).send(err))
  }
}

module.exports = QuestionsController