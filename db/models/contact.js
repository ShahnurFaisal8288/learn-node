'use strict';
const {
  Model,
  Sequelize
} = require('sequelize');
const sequelize = require('../../config/database');
module.exports = sequelize.define('contacts',{
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
  complains: {
    type: Sequelize.STRING
  },
  
},
{
  timestamps:true,
  // paranoid: true,
  freezeTableName: true,
  modelName: 'contacts',
}
);