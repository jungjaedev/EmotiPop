'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Beans extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Beans.belongsTo(models.Users, {
        foreignKey: 'users_id',
        targetKey: 'id',
      });
    }
  }
  Beans.init(
    {
      emotions: DataTypes.STRING,
      emotion_level: DataTypes.INTEGER,
      contents: DataTypes.STRING,
      gourdKinds: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'Beans',
    }
  );
  return Beans;
};
