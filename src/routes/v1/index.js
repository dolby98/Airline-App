const express = require('express');
const router = express.Router();

const authRoutes = require('./auth.routes.js');

const helpController = require('../../controllers/helpController');
const { isTokenValid } = require('../../middlewares/verifyUser.js');


router.get('/help', isTokenValid , helpController.helpDetails);
router.use('/auth', authRoutes);

module.exports = router;
    