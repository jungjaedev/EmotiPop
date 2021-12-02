const express = require('express');
const router = express.Router();
const { beansController } = require('../controller');

// beans 새 글 작성
router.post('/', beansController.new.post);

module.exports = router;
