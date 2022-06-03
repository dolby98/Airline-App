const express = require('express');
const router = express.Router();

const v1Router = require('./v1');

router.get('/',(req,res,next)=>{
    res.status(200).send({
        message : "Hello there"
    });
});

router.use('/v1', v1Router);

module.exports = router;