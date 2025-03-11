const { Sequelize } = require('sequelize');
require("dotenv").config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST || 'localhost',
  dialect: 'mysql', // Sử dụng MySQL
});

async function connectDB() {
  try {
    await sequelize.authenticate();
    console.log("Connect database successfully!");
  } catch (error) {
    console.error("Connect database fail", error);
  }
}

module.exports = connectDB;
