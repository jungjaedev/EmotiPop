const express = require('express');
const router = express.Router();
const { usersController } = require('../controller');
const { body, validationResult } = require('express-validator');

// 유효성 검사
// error 표시
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  return res.status(400).json({ message: errors.array()[0].msg });
};

// email, password
const validateCredential = [
  body('email').isEmail().normalizeEmail().withMessage('Invalid type of Email'),
  body('password').trim().isLength({ min: 6 }).withMessage('password should be at least 6 characters'),
  validate,
];

// + username (signup)
const validateSignup = [...validateCredential, body('username').notEmpty().withMessage('username is missing'), validate];

// API

// POST /users/signup
router.post('/signup', validateSignup, usersController.signup.post);

// POST /users/signin
router.post('/signin', validateCredential, usersController.signin.post);

// POST /users/signout
router.post('/signout', usersController.signout.post);

// POST /users/:user_id
router.delete('/:user_id', usersController.delete.remove);

// GET /users/me
router.get('/me', usersController.me.get);

// POST /users/findme
router.post('/findme', usersController.findme.post);

// // POST /users/reset
// router.post('/reset/:token', usersController.findme.reset);

module.exports = router;
