const express = require('express');
const router = express.Router();
const { calendarController } = require('../controller');

// 콩주머니 작성한 날짜를 달력에 표시해주기 위함
router.get('/', calendarController.beansOnToday.get);

// 날짜별 콩주머니 리스트 조회
router.get('/:calendar_id/:gourdKinds', calendarController.beansList.get);

module.exports = router;