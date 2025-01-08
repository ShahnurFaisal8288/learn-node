'use strict';
const {
  Model,
  Sequelize,
  DataTypes
} = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../../config/database');

module.exports = sequelize.define('users',{
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  userType: {
    type: DataTypes.ENUM('0','1')
  },
  firstName: {
    type: DataTypes.STRING
  },
  lastName: {
    type: DataTypes.STRING
  },
  email: {
    type: DataTypes.STRING
  },
  password: {
    type: DataTypes.STRING
  },
  confirmPassword: {
    type: DataTypes.VIRTUAL,
    set(value){
      if (value === this.password) {
        const hashedPassword = bcrypt.hashSync(value,10);
        this.setDataValue('password', hashedPassword)
      }else{
        throw new Error("Password and Confirm Password must be the same!");
      }
    }
  },

},
{
  timestamps:true,
  // paranoid: true,
  freezeTableName: true,
  modelName: 'users',
}
);