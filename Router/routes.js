const express = require('express');
const router =express.Router();
router.get("/",async(req,res)=>{
    res.send("hello this is host")
})

module.exports = router;