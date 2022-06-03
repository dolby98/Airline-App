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
db.Flight = require('./flight.model')(sequelize,Sequelize);
db.Airline = require('./airline.model')(sequelize,Sequelize);
db.Review = require('./review.model')(sequelize,Sequelize);
db.Booking = require('./booking.model')(sequelize,Sequelize);
//Relations between tables

db.Flight.belongsTo(db.Airline);

db.User.hasMany(db.Review);

db.Flight.hasMany(db.Review);

db.Flight.hasMany(db.Booking);

db.Booking.belongsTo(db.User);

// db.Airline.hasMany(db.Booking);

module.exports = db;

