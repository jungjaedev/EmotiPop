const express = require('express');
const router = express.Router();
const { popsController } = require('../controller');

// GET 일주일에 한번 박터지기 구현
router.get('/', popsController.pop.get);

module.exports = router;