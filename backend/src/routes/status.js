const express = require("express");

const router = express.Router();

router.get("/status",(req,res)=>{
    res.json({
        backend:true,
        database:true,
        llm:false
    });
});

module.exports = router;