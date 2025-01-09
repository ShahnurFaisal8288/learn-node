'use strict';
const {
  Model,
  Sequelize
} = require('sequelize');
const sequelize = require('../../config/database');
module.exports = sequelize.define('enrolments',{
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  name: {
    type: Sequelize.STRING
  },
  phone: {
    type: Sequelize.STRING
  },
  date: {
    type: Sequelize.DATE
  },
  address: {
    type: Sequelize.TEXT
  },
  comment: {
    type: Sequelize.TEXT('Long')
  }
},
{
  timestamps:true,
  // paranoid: true,
  freezeTableName: true,
  modelName: 'enrolments',
}
);