// Importing required package
const express=require('express');
const cors=require('cors');
const mongoose=require('mongoose');

const dotenv=require('dotenv');
const router = require('./Router/routes');
dotenv.config();
const app=express();
 app.use(express.json())
 app.use(cors())
 //router
// app.use('/',router)
app.use('/',router)
 //MongoDB url
 const URI=process.env.MONGO_URL
 
 
 mongoose.connect(URI).then(()=>{
     app.listen(process.env.PORT || 4050,()=>{
         console.log(`Server is running on ${process.env.PORT}`)
     })
 }).catch((error)=>{
     console.log(error)
 })