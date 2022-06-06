const express = require('express');
const router = express.Router();

const flightController = require('../../controllers/flight.controller');
const { isTokenValid, isAdmin } = require('../../middlewares/verifyUser');


router.post('/', [isTokenValid, isAdmin], flightController.createFlight);
router.delete('/:number', [isTokenValid, isAdmin], flightController.deleteFlight);
router.get('/:number', flightController.getAFlight);
router.get('/', flightController.getAllFlights);
router.put('/:number', [isTokenValid, isAdmin], flightController.updateFlight);

module.exports = router;
