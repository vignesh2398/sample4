const express = require('express');
const { hashing } = require('../Function/PasswordHashing');
const { User } = require('../Models/User');
const router =express.Router();
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

module.exports = router;