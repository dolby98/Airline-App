const v1Routes = require("./v1");

module.exports = function(app){
    app.use("/api/airlineApp/v1", v1Routes);
    
}