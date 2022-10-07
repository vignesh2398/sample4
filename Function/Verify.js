const jwt = require("jsonwebtoken")
const Token="sdfsdfsdf"
var verifys = async(req, res, next)=>{
    try {
       
        var token=req.header("auth-token");
        var email=req.header("email");
       var verified = jwt.verify(token, Token);
       

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