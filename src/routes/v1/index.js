const express = require('express');
const router = express.Router();

const authRoutes = require('./auth.routes.js');
const airlineRoutes = require('./airline.routes.js');

const helpController = require('../../controllers/helpController');
const { isTokenValid, isAdmin } = require('../../middlewares/verifyUser.js');


router.get('/help', isTokenValid, isAdmin, helpController.helpDetails);
router.use('/auth', authRoutes);
router.use('/airline', airlineRoutes);


module.exports = router;
    