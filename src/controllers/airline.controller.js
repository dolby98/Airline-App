const db = require('../models');

const Airline = db.Airline;

exports.createAirline = async(req,res) =>{

    try{
        const newAirlineData = {
            name : req.body.name
        }

        const airlineResp = await Airline.create(newAirlineData);

        return res.status(201).send(airlineResp);

    }
    catch(err){
        return res.status(500).send({
            message : err.message
        });
    }

}

exports.deleteairline = async(req,res) =>{
    try{
        const airlineName = req.body.name;

        const airlineResp = await Airline.findByPk(airlineName);
        await airlineResp.destroy();

        return res.status(200).send({
            message : 'airline '+airlineName+' deleted successfully'
        });
    }
    catch(err){
        return res.status(500).send({
            message : err.message
        });
    }
}

exports.getAAirline = (req,res) =>{
    try{
        const airlineName = req.body.name;

        const airlineResp = await Airline.findByPk(airlineName);

        return res.status(200).send(airlineResp);
        
    }
    catch(err){
        return res.status(500).send({
            message : err.message
        });
    }
}

exports.getAllAirlines = (req,res) =>{
    try{

        const airlineResp = await Airline.findAll();

        return res.status(200).send(airlineResp);
    }
    catch(err){
        return res.status(500).send({
            message : err.message
        });
    }
}
