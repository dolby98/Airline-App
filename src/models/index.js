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
db.Role = require('./role.model')(sequelize,Sequelize);
db.Flight = require('./flight.model')(sequelize,Sequelize);
db.Airline = require('./airline.model')(sequelize,Sequelize);
db.Review = require('./review.model')(sequelize,Sequelize);
db.Booking = require('./booking.model')(sequelize,Sequelize);
//Relations between tables

db.User.belongsToMany(db.Role,{
    through: "user_roles",
    as: "roles",
    foreignKey : "userEmail",
    otherKey: "roleId"
});
db.Role.belongsToMany(db.User,{
    through: "user_roles",
    as:"users",
    foreignKey : "roleId",
    otherKey: "userEmail"
});

db.ROLES = ["user","admin"];

// db.Flight.belongsTo(db.Airline);
db.Airline.hasMany(db.Flight);

db.User.hasMany(db.Review);

db.Flight.hasMany(db.Review);
db.Review.belongsTo(db.Flight);

// db.Booking.belongsTo(db.User);
db.User.hasMany(db.Booking);
db.Booking.belongsTo(db.User);

db.Flight.hasMany(db.Booking);
db.Booking.belongsTo(db.Flight);



// db.Airline.hasMany(db.Booking);

module.exports = db;

