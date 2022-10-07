const express = require('express');
const { verifys } = require("../Function/Verify");
const { User } = require("../Models/User");
const { Repo } = require("../Models/Reposchema");
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

  router.put('/commit',verifys,async(req,res)=>{
    try {
      //const email=await req.header("email");
      const id= req.header('id');
     // const user = await User.findOne({email:email}).populate("repo","_id")
      const commita= await Repo.findByIdAndUpdate({_id:id},{$push:{"description":{description:req.body.description,commit:req.body.commit}}},{new:true})
      
      res.status(200).send({success:true,data:commita})
    } catch (error) {
      
      res.send(error)
    }
  })

  router.delete('/delete/:id',verifys,async(req,res)=>{
    try {
      id=req.params.id
      
      const user= await Repo.findById({_id:id})
     const del= await User.findByIdAndUpdate({_id:user.RepoOwner},{$pull:{"repo":id}},{new:true})
  
     const data= await Repo.findByIdAndDelete({_id:id})
      res.send({message:"user delete",success:true})
    } catch (error) {
      
      res.send({message:"User Doesnt exist",success:false})
    }
  })



  module.exports=router
  