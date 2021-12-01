'use strict';
const axios = require('axios');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const newArr = [];
    await axios.get('https://koreanjson.com/users').then(res => {
      for (let i = 0; i < 10; i++) {
        newArr.push({
          id: res.data[i].id,
          username: res.data[i].name,
          email: res.data[i].email,
          password: 'abc123456!',
          createdAt: res.data[i].createdAt,
          updatedAt: res.data[i].updatedAt,
        });
      }
    });
    return queryInterface.bulkInsert('Users', newArr);
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
