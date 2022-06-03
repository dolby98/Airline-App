const db = require('../models');
const config = require('../config/auth.config');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const User = db.User;

exports.register = async(req,res)=>{
    
    try {
        userBody = await User.create({
            username : req.body.username,
            password : bcrypt.hashSync(req.body.password, 10),
            email : req.body.email
        });

        return res.status(201).send({
            message : "User has been successfully created"
        });
    }
    catch(err) {
        return res.status(500).send({
            message : err.message
        });
    }
}

exports.login = async (req,res)=>{

    const userBody = req.body;

    try{
        var token = await jwt.sign(
            {id:userBody},
            config.secret,
            {expiresIn: 3600}
        );

        return res.status(200).send({
            user : req.body.username,
            email : req.body.email,
            token : token
        });
    }
    catch(err){
        return res.status(500).send({
            message1 : err.message
        });
    }

}

