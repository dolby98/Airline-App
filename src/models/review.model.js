module.exports = (sequelize, Sequelize)=>{

    const Review = sequelize.define('review',{
        reviewId : {type:Sequelize.INTEGER, primaryKey:true, autoIncrement:true},
        comment : {type:Sequelize.STRING, allowNull:false}
    },
    {
        tableName : 'reviews'
    });

    return Review;
}