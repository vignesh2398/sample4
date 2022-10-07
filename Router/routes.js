const express = require('express');
const { hashing, hashcompare } = require('../Function/PasswordHashing');
const { User } = require('../Models/User');
const jwt = require("jsonwebtoken")
const router =express.Router();
const Token="sdfsdfsdf"
router.get("/",async(req,res)=>{
    res.send("hello this is host")
})

/*To create New user */
router.post('/Create',async(req, res)=> {
    try {
     const emailExist= await User.findOne({email:req.body.email})
     if(emailExist)
     {
       res.status(200).send("email already exists")
     }
     else{
   
   
      
       let hashedPassword=await hashing(req.body.password)
       req.body.password=hashedPassword
       const user= await User.create(req.body)
       res.status(200).send(user)
     }
    } catch (error) {
     res.status(400).send(error.details)
    }
   });

// To Login

router.post('/login',async(req,res)=>{
  
    
    const UserExist= await User.findOne({email:req.body.email})
    if(UserExist)
    {
      const value= await req.body.password
      const hashedpassword=  UserExist.password
      
      const comparepassword=await hashcompare(value,hashedpassword)
      if(comparepassword)
      {
        try {
          
          const token= jwt.sign({email:UserExist.email},Token)

          res.header("auth-token", token),{new:true}
          res.header("email",UserExist.email).status(200);
          res.send({success:true,token:token,email:UserExist.email})
          console.log(UserExist.email)
        
          
        } catch (error) {
          res.send(error)
        }

      }
      else{
        res.send("Incorrect password")
      }
    }
    else{
      res.send("User doesnt Exist")
    }
 
})

module.exports = router;