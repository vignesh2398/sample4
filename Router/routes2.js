const { verifys } = require("../Function/Verify");
const { User } = require("../Models/User");
const express = require('express');
const router =express.Router();

router.get('/allrepo',verifys,async(req,res)=>{
    try {
      const email=req.header("email");
     
      const user = await User.findOne({email:email}).populate("repo")
      //const user = await User.find().populate("repo")
      //console.log(user)
      
      //res.status(200).send(user[0].repo[0]._id)
      res.status(200).send(user)
    } catch (e) {
          
      res.send(e)
    }
  })

  module.exports=router
  