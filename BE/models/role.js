'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    static associate(models) {
      Role.hasMany(models.User, { foreignKey: 'roleID', as: 'users' });
    }
  }
  Role.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Role',
  });
  return Role;
};