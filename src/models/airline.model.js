module.exports = (sequelize, Sequelize)=>{

    const Airline = sequelize.define('airline',{
        name : {type:Sequelize.STRING, allowNull:false, primaryKey:true},
        website : {type:Sequelize.STRING, allowNull:true}
    },
    {
        tableName : 'airlines'
    });

    return Airline;
}