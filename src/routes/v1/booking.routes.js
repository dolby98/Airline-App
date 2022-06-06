const express = require('express');
const router = express.Router();

const bookingController = require('../../controllers/booking.controller');
const { isTokenValid, isAdmin } = require('../../middlewares/verifyUser');


router.post('/:flightNumber', [isTokenValid], bookingController.createBooking);
router.put('/:bookingId', [isTokenValid], bookingController.cancelBooking);
router.get('/:bookingId', [isTokenValid], bookingController.getBoardingPass);

module.exports = router;
