const express = require('express');
const router = express.Router();

const reviewController = require('../../controllers/review.controller');
const { isTokenValid, isAdmin } = require('../../middlewares/verifyUser');


router.post('/', [isTokenValid], reviewController.createReview);
router.delete('/', [isTokenValid], reviewController.deleteReviewForUser);
router.delete('/:flightNumber', [isTokenValid, isAdmin], reviewController.deleteReviewByFlight);
router.get('/user',[isTokenValid], reviewController.getAReview);
router.get('/', reviewController.getAllReview);
// router.put('/:number', [isTokenValid, isAdmin], reviewController.updateFlight);

module.exports = router;
