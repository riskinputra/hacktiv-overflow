const jwt = require('jsonwebtoken');
require('dotenv').config()

const authentication = (req, res, next)=>{
  jwt.verify(req.headers.token, process.env.SECRET_KEY, function(err, decoded){
    if(err){
      return res.status(401).send(err)
    }
    req.headers.decoded = decoded
    next()
  })
}

module.exports = authentication