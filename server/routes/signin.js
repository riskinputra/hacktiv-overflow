const express = require('express');
const router = express.Router();
const SigninController = require('../controllers/signin')

/* GET users listing. */

module.exports = router
  .post('/', SigninController.loginUser)

