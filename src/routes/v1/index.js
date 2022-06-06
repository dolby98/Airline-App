const express = require('express');
const router = express.Router();

const authRoutes = require('./auth.routes.js');
const airlineRoutes = require('./airline.routes.js');
const flightRoutes = require('./flight.routes');
const reviewRoutes = require('./review.routes.js');
const bookingRoutes = require('./booking.routes');

const helpController = require('../../controllers/helpController');
const { isTokenValid, isAdmin } = require('../../middlewares/verifyUser.js');


router.get('/help', isTokenValid, isAdmin, helpController.helpDetails);
router.use('/auth', authRoutes);
router.use('/airline', airlineRoutes);
router.use('/flight', flightRoutes);
router.use('/review', reviewRoutes);
router.use('/booking', bookingRoutes);


module.exports = router;
    