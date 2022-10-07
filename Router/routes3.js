const express = require('express');
const router =express.Router();
const { verifys } = require("../Function/Verify")
const { Repo } = require("../Models/Reposchema")

router.get('/:id',verifys,async(req,res)=>{
    try {
      id=req.params.id
      const data= await Repo.findById({_id:id})
      res.send({message:data,success:true})
    } catch (error) {
      res.send({message:"User Doesnt exist",success:false})
    }
  })
  module.exports=router