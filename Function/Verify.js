const jwt = require("jsonwebtoken")

var verifys = async(req, res, next)=>{
    try {
       
        var token=req.header("auth-token");
        var email=req.header("email");
       var verified = jwt.verify(token, process.env.Token);
       
        console.log(email==verified.email)
        console.log("jkj",verified)
        console.log("uyui",email)
        if(email==verified.email)
        {

            next(); 
        }
        else{
                res.send({success:false,data:"unauthoriseuser"})
                console.log("unauthoriseuser")
        }
    } catch (error) {
        console.log(error.message)
        res.send(error)
    }
   
}
module.exports={verifys}