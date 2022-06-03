const express = require('express');
const logger = require('morgan');
const db = require('./src/models');
const routeIndex = require('./src/routes/');

// const serverConfig = require('./config/server.config.js');

const app = express();
const router = express.Router();


db.sequelize.sync({force:false}).then(()=>{
    console.log("Updating Airline db");
    // db.User.create({
    //     username:'Dolby',
    //     password:'1234#XYZ',
    //     email:'123@xyz.com'
    // });
}).catch((err)=>{
    console.log("Error occured while connecting" + err);
});


app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(logger('dev'));
app.use('/api/airline', routeIndex);



app.get('/', (req,res)=>{
    res.send("welcome to your airline app");
});




// app.listen(process.env.PORT || serverConfig.PORT, async ()=>{
//     console.log("Server has started");
// });

app.listen(8080, async ()=>{
    console.log("Server has started");
});