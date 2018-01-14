const Answer = require('../models/answer')
const jwt = require('jsonwebtoken')

class AnswerController {
  static getAllAnswer(req, res) {
    Answer.find({questionId: req.headers.questionId})
    .sort({createdAt: -1})
    .populate('userId')
    .then(result => {
      res.status(200).json({
        message: 'Answer',
        data: result
      })
    })
    .catch(err => res.status(500).send(err))
  }

  static createAnswer(req, res) {
    const userId = jwt.verify(req.headers.token, process.env.SECRET_KEY).id
    let newAnswer = new Answer({
      userId: userId,
      questionId: req.headers.questionId,
      comment: req.body.comment
    })
    newAnswer.save()
    .then(result => {
      res.status(200).json({
        message: 'Success to add answer',
        data: result
      })
    })
    .catch(err => res.status(500).send(err))
  }

  static removeAnswer(req, res) {
    const userId = jwt.verify(req.headers.token, process.env.SECRET_KEY).id
    Answer.findById(req.params.id)
    .then(result => {
      if (result.userId == userId) {
        Answer.findByIdAndRemove(req.params.id)
        .then(newRemove => {
          res.status(200).json({
            message: 'Success to remove',
            data: newRemove
          })
        })
      } else {
        res.status(500).send('You dont have permission ')
      }
    })
    .catch(err => res.status(500).send(err))
  }

  static upVoteAnswer(req, res) {
    const userId = jwt.verify(req.headers.token, process.env.SECRET_KEY).id
    Answer.findById(req.params.id)
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

  static downVoteAnswer(req, res) {
    const userId = jwt.verify(req.headers.token, process.env.SECRET_KEY).id
    // console.log(userId)
    Answer.findById(req.params.id)
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

module.exports = AnswerController