const express = require('express');
const router = express.Router();
const { usersController } = require('../controller');

// API

// POST /users/signup
router.post('/signup', usersController.signup.post);

// POST /users/signin
router.post('/signin', usersController.signin.post);

// POST /users/signout
router.post('/signout', usersController.signout.post);

module.exports = router;