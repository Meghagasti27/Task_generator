const express = require("express");

const router = express.Router();

router.post("/generate",(req,res)=>{
    res.json({message:"generate route working"});
});

module.exports = router;
