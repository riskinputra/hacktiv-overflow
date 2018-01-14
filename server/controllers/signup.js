const User = require('../models/user')
const bcrypt  = require('bcryptjs')

class SignupController {
  static createUser(req, res){
    let hash = bcrypt.hashSync(req.body.password, 10)
    let datauser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hash
    })
    datauser.save()
    .then(result => {
      res.status(200).json({
        message: 'Success to Signup',
        user: result
      })
    })
    .catch(err => res.status(500).send(err))
  }
}

module.exports = SignupController