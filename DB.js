const { Sequelize } = require("sequelize");

const DB = new Sequelize("", "", "", {
  host: '',
  dialect: "",
});

module.exports = DB;