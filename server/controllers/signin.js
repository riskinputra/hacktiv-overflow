const User    = require('../models/user')
const bcrypt  = require('bcryptjs');
const jwt     = require('jsonwebtoken');
require('dotenv').config()

class SigninController {
  static loginUser(req, res) {
    User.findOne({
      email: req.body.email
    })
    .then( dataUser => {
      if(!dataUser) {
        return res.status(500).json({
          message: 'E-mail not match',
          user: dataUser
        })
      }
      let temp = bcrypt.compare(req.body.password, dataUser.password)
      if(!temp) {
        return res.status(500).json({
          message: 'Password incorrect',
          user: dataUser
        })
      } else {
        jwt.sign({id: dataUser.id, username:dataUser.username, email:dataUser.email}, process.env.SECRET_KEY, (err, token) => {
          return res.status(200).json({
            message: 'Success to Login',
            token: token
          })
        })
      }
    })
    .catch(err => {
      console.log(err)
      res.status(500).send(err)
    })
  }
}

module.exports = SigninController