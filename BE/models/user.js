'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.belongsTo(models.Role, {
        foreignKey: "roleID",
        as: "role",
      });
    }
  }
  User.init({
    name: DataTypes.STRING,
    phone: DataTypes.STRING,
    password: DataTypes.STRING,
    birthday: DataTypes.STRING,
    email: DataTypes.STRING,
    address: DataTypes.STRING,
    roleID: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};