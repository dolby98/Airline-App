const db = require('../models');
const config = require('../config/auth.config');


const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = db.User;

const checkUserRegisterationDetails = async(req,res,next)=>{

    try{
        const username = req.body.username;
        const password = req.body.password;
        const email = req.body.email;

        if(!username){
            res.status(400).send({
                message : "username cannot be empty"
            });

            return;
        }

        else if(!password){
            res.status(400).send({
                message : "password cannot be empty"
            });

            return;
        }

        else if(!email){
            res.status(400).send({
                message : "email cannot be empty"
            });

            return;
        }

        else{
            users = await User.findAll({
                where:{
                    email : email
                }
            });
    
            if(users.length>0){
                res.status(400).send({
                    message : "email already exists"
                });
                return;
            }
        }

        next();
    }

    catch(err){
        res.status(500).send({
            message : "Some internal server error occurred "+ err
        });
    }
}

const checkUserLoginDetails = async(req,res,next)=>{

    try{

        const username = req.body.username;
        const password = req.body.password;
        const email = req.body.email;

        if(!username){
            res.status(400).send({
                message : "username cannot be empty"
            });

            return;
        }

        else if(!password){
            res.status(400).send({
                message : "password cannot be empty"
            });

            return;
        }

        else if(!email){
            res.status(400).send({
                message : "email cannot be empty"
            });

            return;
        }

        else{
            user = await User.findOne({
                where:{
                    email : email
                }
            });

            if(user.length==0){
                res.status(404).send({
                    message : "Could not find the user"
                });

                return;
            }
            else{
                var isPasswordValid = bcrypt.compareSync(password, user.password);

                if(!isPasswordValid){
                    res.status(400).send({
                        message : "Invalid Password"
                    });

                    return;
                }
                console.log('Hi');
            }
            console.log('Hello');
        }
        next();
    }
    catch(err){
        res.status(500).send({
            message2 : "Some internal server error occurred "+ err
        });
    }
}

const isTokenValid = async(req,res,next)=>{
    // console.log(req.headers);
    var token = req.headers["authorization"];
    console.log(token);
    if(!token){
        return res.status(400).send({
            message : "Token not provided"
        });
    }

    await jwt.verify(token,config.secret,(err,decoded)=>{
        if(err){
            return res.status(401).send({
                message : "Unauthorized/Invalid Token"
            });
        }
        console.log(decoded);
    });

    next();
}

module.exports = {checkUserRegisterationDetails, checkUserLoginDetails, isTokenValid};