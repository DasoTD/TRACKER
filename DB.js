const { Sequelize } = require("sequelize");

const DB = new Sequelize("soc_db", "postgres", "secret", {
  host: 'localhost',
  dialect: "postgres",
});

module.exports = DB;