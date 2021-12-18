const express = require('express');
const router = express.Router();
const { beansController } = require('../controller');

// POST 게시글 작성
router.post('/', beansController.new.post);

// GET 게시글 상세보기
router.get('/:beans_id', beansController.detail.get);

// PATCH 게시글 수정
router.patch('/:beans_id', beansController.update.patch);

// DELETE 게시글 삭제
router.delete('/:beans_id', beansController.delete.delete);

module.exports = router;
