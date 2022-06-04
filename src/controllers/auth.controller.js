const db = require('../models');
const config = require('../config/auth.config');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Op = db.Sequelize.Op;
const User = db.User;
const Role = db.Role;

exports.register = async(req,res)=>{
    
    try {
        userResp = await User.create({
            username : req.body.username,
            password : bcrypt.hashSync(req.body.password, 10),
            email : req.body.email
        });

        if(req.body.roles){
            roles = await Role.findAll({
                where:{
                    name:{
                        [Op.or] : req.body.roles
                    }
                }
            }); 

            resp = await userResp.setRoles(roles);
            return res.status(201).send({
                message : "User has been successfully created"
            });
            
        }
        else{
            resp = await userResp.setRoles([1]);
            return res.status(201).send({
                message : "User has been successfully created"
            });
        }
    }
    catch(err) {
        return res.status(500).send({
            message : err.message
        });
    }
}

exports.login = async (req,res)=>{

    try{
        const userBody = req.body;

        const userResp = await User.findOne({
            where:{
                email : req.body.email
            }
        });

        if(!userResp){
            return res.status(404).send({
                message : 'User not found'
            });
        }

        var token = await jwt.sign(
            {id:userBody},
            config.secret,
            {expiresIn: 3600}
        );

        var authorities = [];
        var roles = await userResp.getRoles();

        for(let i=0; i<roles.length; i++){
            authorities.push("ROLE_"+roles[i].name.toUpperCase());
        }

        return res.status(200).send({
            user : req.body.username,
            email : req.body.email,
            role : authorities,
            token : token
        });
    }
    catch(err){
        return res.status(500).send({
            message : err.message
        });
    }

}

