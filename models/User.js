"use strict";
const { Model, DataTypes, Sequelize } = require("sequelize");
const sequelize = require("../DB");
const User = sequelize.define('User', {
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type:DataTypes.STRING
  }
});
module.exports = User;
