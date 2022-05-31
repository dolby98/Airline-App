const express = require('express');
const app = express();
const logger = require('morgan');
// const serverConfig = require('./config/server.config.js');



app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(logger('dev'));


app.get('/', (req,res)=>{
    res.send("welcome to your airline app");
});


require('./src/routes')(app); //Passing express app as parameter

// app.listen(process.env.PORT || serverConfig.PORT, async ()=>{
//     console.log("Server has started");
// });

app.listen(8080, async ()=>{
    console.log("Server has started");
});