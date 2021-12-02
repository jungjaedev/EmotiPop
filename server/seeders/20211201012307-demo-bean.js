'use strict';
const axios = require('axios');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const newArr = [];
    const emotionsList = [];
    const userId = [];
    const gourdKindsList = [];

    for (let j = 0; j < 10; j++) {
      if (j < 3) {
        userId.push(1);
      } else if (j < 6) {
        userId.push(2);
      } else {
        userId.push(3);
      }
    }

    for (let k = 0; k < 10; k++) {
      if (k < 3) {
        gourdKindsList.push(true);
      } else if (k < 6) {
        gourdKindsList.push(false);
      } else {
        gourdKindsList.push(true);
      }
    }

    for (let i = 0; i < 10; i++) {
      if (i < 3) {
        emotionsList.push('기쁨');
      } else if (i < 6) {
        emotionsList.push('슬픔');
      } else {
        emotionsList.push('설렘');
      }
    }
    await axios.get('https://koreanjson.com/posts').then(res => {
      for (let i = 0; i < 10; i++) {
        newArr.push({
          id: res.data[i].id,
          emotions: emotionsList[i],
          emotion_level: i + 1,
          contents: res.data[i].title,
          gourdKinds: gourdKindsList[i],
          createdAt: res.data[i].createdAt,
          updatedAt: res.data[i].updatedAt,
          users_id: userId[i],
        });
      }
    });
    return queryInterface.bulkInsert('Beans', newArr);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
