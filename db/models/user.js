'use strict';
const {
  Model,
  Sequelize
} = require('sequelize');
const sequelize = require('../../config/database');

module.exports = sequelize.define('users',{
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  userType: {
    type: Sequelize.ENUM('0','1')
  },
  firstName: {
    type: Sequelize.STRING
  },
  lastName: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING
  },
  password: {
    type: Sequelize.STRING
  },

},
{
  timestamps:true,
  // paranoid: true,
  freezeTableName: true,
  modelName: 'users',
}
);