const db = require('../models');

const Review = db.Review;
const Flight = db.Flight;

exports.createReview = async(req,res) =>{

    try{
        const newReviewdata = {
            comment : req.body.comment,
            userEmail : req.userEmail,
            flightNumber : req.body.flightNumber
        }

        const reviewResp = await Review.create(newReviewdata);
        return res.status(201).send(reviewResp);

    }
    catch(err){
        return res.status(500).send({
            message : err.message
        });
    }

}

exports.deleteReviewForUser = async(req,res) =>{
    try{
        const review = await Review.destroy({
            where:{
                userEmail : req.userEmail
            }
        });

        return res.status(200).send({
            message : 'review deleted successfully'
        });
    }
    catch(err){
        return res.status(500).send({
            message : err.message
        });
    }
}

exports.deleteReviewByFlight = async(req,res) =>{
    try{
        const review = await Review.destroy({
            where:{
                flightNumber : req.params.flightNumber
            }
        });

        return res.status(200).send({
            message : 'review for flight'+review+' deleted successfully'
        });
    }
    catch(err){
        return res.status(500).send({
            message : err.message
        });
    }
}

exports.getAReview = async(req,res) =>{
    try{

        const reviewResp = await Review.findAll({
            where:{
                userEmail : req.userEmail
            }
        });
        console.log(reviewResp);
        return res.status(200).send(reviewResp);
        
    }
    catch(err){
        return res.status(500).send({
            message : err.message
        });
    }
}

exports.getAllReview = async(req,res) =>{
    try{
        let reviewResp;
        if(req.query.filter){
            // const flightNumber = req.query.filter.split(' ')[2];
            // console.log(flightNumber);
            // reviewResp = await Review.findAll({
            //     where:{
            //         flightNumber : flightNumber
            //     }
            // });
            let airlineName = req.query.filter.split('eq ')[1];
            reviewResp = await Review.findAll({
                include: {
                    model : Flight,
                    where: {
                        airlineName : airlineName
                    },
                    attributes: []
                }
            });
            console.log(reviewResp);
        }
        else{
            reviewResp = await Review.findAll();
        }

        return res.status(200).send(reviewResp);
    }
    catch(err){
        return res.status(500).send({
            message : err.message
        });
    }
}
