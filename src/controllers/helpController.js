exports.helpDetails = (req,res)=>{
    console.log(req.query);
    return res.status(200).json({
        "message" : "Successfully hittinh help API",
        "success" : true,
        "data" : {
            "contact" : "+91XXXXXXXXXX"
        }
    });
}