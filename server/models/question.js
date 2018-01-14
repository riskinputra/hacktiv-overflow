const mongoose        = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const Schema          = mongoose.Schema

const questionSchema = new Schema({
  userId  : {
    type      : Schema.Types.ObjectId,
    ref       : 'User'  
  },
  title  : {
    type      : String,
    required  : [true, 'Title required']
  },
  content     : {
    type      : String,
    required  : [true, 'Content required']
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

const Question = mongoose.model("Question", questionSchema);
module.exports = Question