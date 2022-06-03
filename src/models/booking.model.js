module.exports = (sequelize, Sequelize)=>{

    const Booking = sequelize.define('booking',{
        id : {type:Sequelize.INTEGER, primaryKey:true, autoIncrement:true},
        status : {type:Sequelize.ENUM("Booked", "Cancelled", "In Process"), allowNull:false, defaultValue : 'In Process'}
    },
    {
        tableName : 'bookings'
    });

    return Booking;
}