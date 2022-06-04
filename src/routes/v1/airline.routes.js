const express = require('express');
const router = express.Router();

const airlineController = require('../../controllers/airline.controller');
const { isTokenValid, isAdmin } = require('../../middlewares/verifyUser');


router.post('/', [isTokenValid, isAdmin], airlineController.createAirline);
router.delete('/:name', [isTokenValid, isAdmin], airlineController.deleteairline);
router.get('/:name', airlineController.getAAirline);
router.get('/', airlineController.getAllAirlines);

module.exports = router;
