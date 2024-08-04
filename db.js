// db.js
const Sequelize = require('sequelize');
const sequelize = new Sequelize('authentication', 'root', '@ldbOy2003', {
    host: 'localhost',
    dialect: 'mysql',
    // Other options...
});


const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
