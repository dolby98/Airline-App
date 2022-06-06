const db = require('../models');

const Booking = db.Booking;
const Flight = db.Flight;
const User = db.User;

exports.createBooking = async(req,res) =>{

    try{
        const newBookingData = {
            status : "Booked",
            userEmail : req.userEmail,
            flightNumber : req.params.flightNumber
        }

        const bookingResp = await Booking.create(newBookingData);

        return res.status(201).send(bookingResp);

    }
    catch(err){
        return res.status(500).send({
            message : err.message
        });
    }

}

exports.cancelBooking = async(req,res) =>{
    try{
        const bookingId = req.params.bookingId;

        const bookingResp = await Booking.findByPk(bookingId);
        if(!bookingResp){
            return res.status(404).send({
                message : 'booking not found/ Invalid booking id'
            });
        }
        if(bookingResp.status=='Cancelled'){
            return res.status(400).send({
                message : 'booking already cancelled'
            });
        }
        bookingResp.set({
            status: "cancelled"
        })
        await bookingResp.save();

        return res.status(200).send({
            message : 'booking cancelled successfully'
        });
    }
    catch(err){
        return res.status(500).send({
            message : err.message
        });
    }
}

exports.getBoardingPass = async(req,res) =>{
    try{
        const bookingId = req.params.bookingId;

        boardingPassResp = await Booking.findAll({
            where: {
                id: bookingId
            },
            include: [
                {
                    model: Flight
                },
                {
                    model: User,
                    attributes: ['username','email']
                }
            ]
        });
        if(boardingPassResp){
            return res.status(404).send({
                message: "Booking not found. Id invalid"
            });    
        }
        console.log(boardingPassResp);
        return res.status(200).send(boardingPassResp);
        
    }
    catch(err){
        return res.status(500).send({
            message : err.message
        });
    }
}
