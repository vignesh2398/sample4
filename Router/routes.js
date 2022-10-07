const express = require('express');
const { hashing, hashcompare } = require('../Function/PasswordHashing');
const { User } = require('../Models/User');
const jwt = require("jsonwebtoken");
const { Repo } = require('../Models/Reposchema');
const { verifys } = require('../Function/Verify');
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


router.post('/repo',verifys,async(req,res)=>{
    //const RepoExist1 = await Repo.findOne({RepoName:req.body.RepoName})
     const email = req.header("email")
     const RepoExist = await User.findOne({email:email}).populate("repo")
     if(RepoExist)
     var fil= RepoExist.repo;
     
     //var result = await fil.filter(fils=>{ return (fils.RepoName == req.body.RepoName)} )
    
     const hasMatch= fil.filter(fils=>{
       return(fils.RepoName== req.body.RepoName)
     }).length>0;
          
   
     try {
       if(!hasMatch)
       { 
         const email= req.header("email");
         const user = await User.findOne({email:email})
         req.body.RepoOwner=user._id    
   
     const repo= await Repo.create(req.body)
     const update= await User.findById({_id:user._id})
     const updateuser = await User.findByIdAndUpdate({_id:user._id},{$push:{"repo":repo._id}})
     
     //const data= await attendnce.findByIdAndUpdate({_id:req.body._id},{$push:{"atte":{Login:req.body.Login,Logout:req.body.Logout}}})
     res.status(200).send({message:`Repo ${req.body.RepoName} Created`,success:true})
     const user1 = await User.findOne({email:email})
   
       }
       else{
         res.status(200).send({message:`Try another reponame ${req.body.RepoName} already  exist`})
       }
     } catch (error) {
       res.status(400).send({success:false})
       
     }
   
   })



module.exports = router;