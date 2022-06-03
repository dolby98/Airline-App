const Sequelize = require('sequelize');
const dbConfig = require('../config/db.config.json');
require('dotenv').config();

const env = process.env.environment;
const dbSetting = dbConfig[env];
const sequelize = new Sequelize(
    dbSetting.database,
    dbSetting.username,
    dbSetting.password,
    dbSetting.hostDialect
);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require('./user.model')(sequelize,Sequelize);

module.exports = db;

