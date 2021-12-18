'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface
      .createTable('Beans', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        emotions: {
          type: Sequelize.STRING,
        },
        emotion_level: {
          type: Sequelize.INTEGER,
        },
        contents: {
          type: Sequelize.STRING,
        },
        gourdKinds: {
          type: Sequelize.BOOLEAN,
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
      })
      .then(() => {
        queryInterface.addColumn('Beans', 'users_id', {
          type: Sequelize.DataTypes.INTEGER,
          references: {
            model: 'Users',
            key: 'id',
          },
        });
      });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Beans');
  },
};
