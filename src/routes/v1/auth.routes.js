const express = require('express');
const router = express.Router();

const authController = require('../../controllers/auth.controller');
const { checkUserRegisterationDetails, checkUserLoginDetails } = require('../../middlewares/verifyUser');

router.use(function(res,req,next){
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    )

    next();

});

console.log("Inside auth routes");
router.post('/register',checkUserRegisterationDetails, authController.register);
router.post('/login',checkUserLoginDetails, authController.login);

module.exports = router;
