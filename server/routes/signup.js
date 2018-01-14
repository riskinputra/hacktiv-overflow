const express = require('express');
const router = express.Router();
const SignupController = require('../controllers/signup')

/* GET users listing. */

module.exports = router
  .post('/', SignupController.createUser)

