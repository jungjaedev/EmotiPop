'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Auths extends Model {
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
  };
  Auths.init({
    token: DataTypes.STRING,
    users_id: DataTypes.INTEGER,
    ttl: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Auths',
  });
  return Auths;
};