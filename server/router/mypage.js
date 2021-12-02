const express = require('express');
const router = express.Router();
const { mypageController } = require('../controller');

// PATCH /mypage
router.patch('/', mypageController.updateInfo.patch);

// DELETE /mypage
router.delete('/', mypageController.deleteInfo.remove);

module.exports = router;