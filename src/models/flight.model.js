module.exports = (sequelize, Sequelize)=>{

    const Flight = sequelize.define('flight',{
        id : {type:Sequelize.STRING, allowNull:false, primaryKey:true},
        departureAirport : {type:Sequelize.STRING, allowNull:false},
        arrivalAirport : {type:Sequelize.STRING, allowNull:false},
        duration : {type:Sequelize.INTEGER, allowNull:false},
        flightDate : {type:Sequelize.DATEONLY, defaultValue:new Date()},
        departureTime : {type:'TIMESTAMP'},
        arrivalTime : {type:'TIMESTAMP'},
        price : {type:Sequelize.INTEGER, defaultValue:0},
        boardingGate : {type:Sequelize.STRING, allowNull:false, defaultValue:"Yet to be updated"}
    },
    {
        tableName : 'flights'
    });

    return Flight;
}