const db = require('../models');
const Op = db.Sequelize.Op;
// const Op = require('sequelize');

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
        const flightNumber = req.params.number;
        var flightResp = await Flight.findByPk(flightNumber);
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
        let flightResp;
        flightQuery = req.query
        sort = flightQuery.sort;
        filter = flightQuery.filter;
        if(sort || filter){
            
            if(sort){
                sortBy = sort.split(',');
                sortByParameters = []
                for(element of sortBy){
                    attribute = element.split(' ');
                    if(attribute[0]=='duration' || attribute[0]=='price'){
                        sortByParameters.push(attribute);
                    }
                    else{
                        return res.status(400).send({
                            message : "Only duration and price can be sorted"
                        });
                    }
                }
                
                flightResp = await Flight.findAll({
                    order : sortByParameters
                });
            }
            else if(filter){
                filterBy = filter.split(',');
                filterByParameters = {};
                for(element of filterBy){
                    attribute = element.split(' ');
                    if(attribute[0]=='duration' || attribute[0]=='price'){
                        let filterQuery;
                        if(attribute[1]=='lt'){
                            filterQuery = {[Op.lt] : parseInt(attribute[2])};
                        }
                        else if(attribute[1]=='gt'){
                            filterQuery = {[Op.gt] : parseInt(attribute[2])};
                        }
                        else if(attribute[1]=='eq'){
                            filterQuery = {[Op.eq] : parseInt(attribute[2])};
                        }
                        
                        filterByParameters[attribute[0]] = filterQuery;
                    }
                    else{
                        return res.status(400).send({
                            message : "Only duration and price can be filtered"
                        });
                    }
                }                
                flightResp = await Flight.findAll({
                    where: filterByParameters
                });
            }
        }
        else{
            flightResp = await Flight.findAll();
        }
        

        return res.status(200).send(flightResp);
    }
    catch(err){
        return res.status(500).send({
            message : err.message
        });
    }
}

