const db = require('../models');

const Flight = db.Flight;

exports.createFlight = async(req,res) =>{

    try{
        const newFlightData = {
            number : req.body.number,
            departureAirport : req.body.departureAirport,
            arrivalAirport : req.body.arrivalAirport,
            duration : req.body.duration,
            flightDate : req.body.flightDate,
            departureTime : req.body.departureTime,
            arrivalTime : req.body.arrivalTime,
            price : req.body.price,
            airlineName : req.body.airlineName
        }

        const flightResp = await Flight.create(newFlightData);

        return res.status(201).send(flightResp);

    }
    catch(err){
        return res.status(500).send({
            message : err.message
        });
    }

}

exports.updateFlight = async(req,res) =>{
    try{
        const flightNumber = req.body.number;
        const flightResp = await Flight.findByPk(flightNumber);
        flightResp.set(req.body);
        flightResp = await flightResp.save();

        return res.status(200).send(flightResp);

    }
    catch(err){
        return res.status(500).send({
            message : err.message
        });
    }
}

exports.deleteFlight = async(req,res) =>{
    try{
        const flightNumber = req.params.number;

        const flightResp = await Flight.findByPk(flightNumber);
        await flightResp.destroy();

        return res.status(200).send({
            message : 'Flight '+flightNumber+' deleted successfully'
        });
    }
    catch(err){
        return res.status(500).send({
            message : err.message
        });
    }
}

exports.getAFlight = async(req,res) =>{
    try{
        const flightNumber = req.params.number;

        const flightResp = await Flight.findByPk(flightNumber);

        return res.status(200).send(flightResp);
        
    }
    catch(err){
        return res.status(500).send({
            message : err.message
        });
    }
}

exports.getAllFlights = async(req,res) =>{
    try{

        const flightResp = await Flight.findAll();

        return res.status(200).send(flightResp);
    }
    catch(err){
        return res.status(500).send({
            message : err.message
        });
    }
}
