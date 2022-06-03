exports.helpDetails = (req,res)=>{
    return res.status(200).json({
        "message" : "Successfully hittinh help API",
        "success" : true,
        "data" : {
            "contact" : "+91XXXXXXXXXX"
        }
    });
}