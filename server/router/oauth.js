const express = require('express');
const router = express.Router();
const { oauthController } = require('../controller');

// POST 구글 로그인
router.post('/signin', oauthController.signin.post);

module.exports = router;
