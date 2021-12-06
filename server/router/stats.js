const express = require('express');
const router = express.Router();
const { statsController } = require('../controller');

// Get 통계
router.get('/', statsController.stats.get);

module.exports = router;
