const mongoose        = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const Schema          = mongoose.Schema

const answerSchema = new Schema({
  userId  : {
    type      : Schema.Types.ObjectId,
    ref       : 'User'  
  },
  questionId : {
    type      : Schema.Types.ObjectId,
    ref       : 'Question' 
  },
  comment  : {
    type      : String,
    required  : [true, 'Comment required']
  },
  upVote  : [{
    type      : Schema.Types.ObjectId,
    ref       : 'User'
  }],
  downVote : [{
    type      : Schema.Types.ObjectId,
    ref       : 'User'
  }],
  createdAt : {
    type      : Date,
    default   : new Date()
  }
})

const Answer = mongoose.model("Answer", answerSchema);
module.exports = Answer